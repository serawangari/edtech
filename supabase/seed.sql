-- Seed example orgs and school
insert into public.organizations (id,name,type) values
  ('00000000-0000-0000-0000-000000000001','Green Roots Kenya','ngo') on conflict do nothing,
  ('00000000-0000-0000-0000-000000000002','Nairobi High School','school') on conflict do nothing,
  ('00000000-0000-0000-0000-000000000003','Savanna Telecom','corporate') on conflict do nothing;

insert into public.schools (org_id, county, lat, lng)
values ('00000000-0000-0000-0000-000000000002','Nairobi',-1.286,36.817)
on conflict do nothing;

insert into public.clubs (school_id, name)
select s.id, 'Green Club' from public.schools s
where s.org_id = '00000000-0000-0000-0000-000000000002'
on conflict do nothing;
