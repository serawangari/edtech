-- ===== Leafscapes Supabase Init =====

-- Enums
create type user_role as enum ('admin','teacher','student','csr','ngo_admin');
create type org_type  as enum ('school','corporate','ngo');
create type activity_type as enum ('tree_planting','waste_audit','clean_up','quiz','custom');

-- Updated-at trigger
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- Optional PostGIS
create extension if not exists postgis;

-- Organizations
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type org_type not null,
  locale text default 'en',
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger organizations_updated_at before update on public.organizations
for each row execute procedure set_updated_at();

-- Profiles
create table if not exists public.profiles (
  id uuid primary key,
  org_id uuid references public.organizations(id) on delete set null,
  role user_role not null default 'student',
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger profiles_updated_at before update on public.profiles
for each row execute procedure set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, role) values (new.id, 'student') on conflict do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Schools
create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  org_id uuid unique not null references public.organizations(id) on delete cascade,
  county text,
  lat double precision,
  lng double precision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger schools_updated_at before update on public.schools
for each row execute procedure set_updated_at();

-- Clubs
create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists clubs_school_id_idx on public.clubs(school_id);
create trigger clubs_updated_at before update on public.clubs
for each row execute procedure set_updated_at();

-- Club members
create table if not exists public.club_members (
  club_id uuid references public.clubs(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  is_leader boolean default false,
  joined_at timestamptz not null default now(),
  primary key (club_id, profile_id)
);
create index if not exists club_members_profile_idx on public.club_members(profile_id);

-- Activities
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  type activity_type not null,
  title text not null,
  description text,
  points int not null default 10,
  occurred_at timestamptz not null default now(),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  lat double precision,
  lng double precision,
  geom geography(Point, 4326)
);
create index if not exists activities_club_idx on public.activities(club_id);
create index if not exists activities_type_idx on public.activities(type);
create index if not exists activities_occurred_idx on public.activities(occurred_at);
create trigger activities_updated_at before update on public.activities
for each row execute procedure set_updated_at();

-- Evidence
create table if not exists public.evidence (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.activities(id) on delete cascade,
  storage_path text not null,
  caption text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
create index if not exists evidence_activity_idx on public.evidence(activity_id);

-- Sponsorships
create table if not exists public.sponsorships (
  id uuid primary key default gen_random_uuid(),
  sponsor_org_id uuid not null references public.organizations(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  club_id uuid references public.clubs(id) on delete set null,
  currency text default 'KES',
  amount numeric(12,2) not null,
  status text default 'pledged',
  starts_on date,
  ends_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((school_id is not null) or (club_id is not null))
);
create index if not exists sponsorships_sponsor_idx on public.sponsorships(sponsor_org_id);
create trigger sponsorships_updated_at before update on public.sponsorships
for each row execute procedure set_updated_at();

-- Leads
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  organization text not null,
  audience text not null check (audience in ('school','corporate','ngo')),
  message text not null
);

-- RLS
alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.schools enable row level security;
alter table public.clubs enable row level security;
alter table public.club_members enable row level security;
alter table public.activities enable row level security;
alter table public.evidence enable row level security;
alter table public.sponsorships enable row level security;
alter table public.leads enable row level security;

-- helper: viewer org
create or replace function public.profile_org_id()
returns uuid language sql stable as $$
  select org_id from public.profiles where id = auth.uid();
$$;

-- policies
create policy "profile self read" on public.profiles for select using (id = auth.uid());
create policy "profile self update" on public.profiles for update using (id = auth.uid());

create policy "org read if my profile belongs here"
  on public.organizations for select using (id = public.profile_org_id());

create policy "schools readable within my org"
  on public.schools for select using (org_id = public.profile_org_id());

create policy "clubs readable within my org"
  on public.clubs for select using (
    school_id in (select s.id from public.schools s where s.org_id = public.profile_org_id())
  );

create policy "member reads own clubs"
  on public.club_members for select using (profile_id = auth.uid());

create policy "activities read within org"
  on public.activities for select using (
    club_id in (
      select c.id from public.clubs c
      join public.schools s on s.id = c.school_id
      where s.org_id = public.profile_org_id()
    )
  );

create policy "activities insert by org members"
  on public.activities for insert with check (
    exists (
      select 1 from public.club_members m
      join public.clubs c on c.id = m.club_id
      join public.schools s on s.id = c.school_id
      where m.profile_id = auth.uid()
        and c.id = activities.club_id
        and s.org_id = public.profile_org_id()
    )
  );

create policy "evidence read within org"
  on public.evidence for select using (
    activity_id in (
      select a.id from public.activities a
      join public.clubs c on c.id = a.club_id
      join public.schools s on s.id = c.school_id
      where s.org_id = public.profile_org_id()
    )
  );

create policy "evidence insert by org members"
  on public.evidence for insert with check (
    exists (
      select 1 from public.activities a
      join public.clubs c on c.id = a.club_id
      join public.schools s on s.id = c.school_id
      where a.id = evidence.activity_id
        and s.org_id = public.profile_org_id()
    )
  );

create policy "sponsor reads own sponsorships"
  on public.sponsorships for select using (
    sponsor_org_id = public.profile_org_id()
    or (school_id in (select sch.id from public.schools sch where sch.org_id = public.profile_org_id()))
  );

-- Optional public RPC to submit leads without service role (anon execute)
create or replace function public.submit_lead(
  p_name text, p_email text, p_org text, p_audience text, p_message text
) returns uuid language sql security definer set search_path = public as $$
  insert into public.leads (name,email,organization,audience,message)
  values (p_name,p_email,p_org,p_audience,p_message)
  returning id;
$$;
grant execute on function public.submit_lead(text,text,text,text,text) to anon;

-- Analytics views
create or replace materialized view public.leaderboard_clubs as
select
  c.id as club_id,
  c.name as club_name,
  s.id as school_id,
  coalesce(sum(a.points),0) as total_points,
  count(a.*) as activities_count
from public.clubs c
join public.schools s on s.id = c.school_id
left join public.activities a on a.club_id = c.id
group by c.id, s.id;

create index if not exists leaderboard_points_idx on public.leaderboard_clubs(total_points desc);

create or replace view public.impact_totals as
select
  (select count(*) from public.schools) as schools,
  (select count(*) from public.club_members) as students_participating,
  coalesce((select sum(points) from public.activities where type='tree_planting'),0) as tree_points;
