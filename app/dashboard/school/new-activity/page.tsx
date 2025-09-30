// app/dashboard/school/new-activity/page.tsx (server component)
import {createClient} from '@/lib/supabase';
import {redirect} from 'next/navigation';

async function create(formData: FormData) {
  'use server';
  const supabase = createClient();

  const clubId = formData.get('club_id') as string;
  const type = formData.get('type') as string;
  const title = formData.get('title') as string;
  const points = Number(formData.get('points') || 10);

  if (!clubId || !type || !title) {
    // In a real app, return a form state error instead
    redirect('/dashboard/school?error=missing_fields');
  }

  await supabase.from('activities').insert({
    club_id: clubId,
    type,
    title,
    points
  });

  redirect('/dashboard/school');
}

export default async function Page() {
  const supabase = createClient();
  const {data: clubs} = await supabase
    .from('clubs')
    .select('id,name')
    .limit(100);

  return (
    <form action={create} className="mx-auto max-w-xl space-y-4 p-4">
      <h1 className="text-2xl font-bold text-slate-900">Log activity</h1>

      <label className="block">
        <span className="text-sm text-slate-600">Club</span>
        <select name="club_id" className="mt-1 w-full rounded-lg ring-1 ring-slate-200 p-2" required>
          {(clubs ?? []).map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm text-slate-600">Type</span>
        <select name="type" className="mt-1 w-full rounded-lg ring-1 ring-slate-200 p-2" required>
          <option value="tree_planting">Tree planting</option>
          <option value="waste_audit">Waste audit</option>
          <option value="clean_up">Clean up</option>
          <option value="quiz">Quiz</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm text-slate-600">Title</span>
        <input name="title" required className="mt-1 w-full rounded-lg ring-1 ring-slate-200 p-2" />
      </label>

      <label className="block">
        <span className="text-sm text-slate-600">Points</span>
        <input name="points" type="number" defaultValue={10} min={0} className="mt-1 w-full rounded-lg ring-1 ring-slate-200 p-2" />
      </label>

      <button className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700">
        Save
      </button>
    </form>
  );
}
