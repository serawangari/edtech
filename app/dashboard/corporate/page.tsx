import {createClient} from '@/lib/supabase';

export default async function Corporate() {
  const supabase = createClient();

  const {data: schools} = await supabase
    .from('schools')
    .select('id,name,county,clubs:clubs(id,name)')
    .limit(50);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Discover clubs</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {(schools ?? []).map((s: any) => (
          <div key={s.id} className="rounded-2xl bg-white ring-1 ring-slate-200 p-5">
            <div className="font-semibold text-slate-900">{s.name}</div>
            <div className="text-sm text-slate-500">{s.county ?? '—'}</div>
            <ul className="mt-3 space-y-1 text-sm">
              {(s.clubs ?? []).map((c: any) => (
                <li key={c.id} className="flex items-center justify-between">
                  <span>{c.name}</span>
                  <a className="text-emerald-700 hover:underline" href={`/dashboard/corporate/club/${c.id}`}>View</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

