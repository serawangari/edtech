import {createClient} from '@/lib/supabase';
import {useTranslations} from 'next-intl';

export default async function ImpactSection() {
  const t = useTranslations('impact');
  const supabase = createClient();

  const {data} = await supabase.from('impact_totals').select('*').single();
  const totals = data ?? {schools: 0, students_participating: 0, tree_points: 0};

  return (
    <section id="impact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-slate-900">{t('title')}</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label={t('schools')} value={totals.schools} />
        <Stat label={t('students')} value={totals.students_participating} />
        <Stat label={t('trees')} value={totals.tree_points} />
      </div>
    </section>
  );
}

function Stat({label, value}:{label:string; value:number}) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm">
      <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
        {value.toLocaleString()}
      </div>
      <div className="mt-1 text-slate-500">{label}</div>
    </div>
  );
}
