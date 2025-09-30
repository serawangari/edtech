// app/dashboard/school/page.tsx
import {createClient} from '@/lib/supabase';

export default async function SchoolDashboardPage() {
  const supabase = createClient();

  // Try to show a tiny summary but don't crash if the view/table is empty.
  const {data: topClubs} = await supabase
    .from('leaderboard_clubs')
    .select('club_name,total_points')
    .order('total_points', {ascending: false})
    .limit(5);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">School Dashboard</h1>
        <p className="text-slate-600">Quick links for teachers & club leads.</p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href="/dashboard/school/curriculum" className="rounded-xl p-6 ring-1 ring-slate-200 bg-white hover:bg-slate-50">
          <h3 className="font-semibold text-slate-900">Green Club Curriculum</h3>
          <p className="text-slate-600 mt-1">Browse sessions and track completion.</p>
        </a>

        <a href="/dashboard/school/new-activity" className="rounded-xl p-6 ring-1 ring-slate-200 bg-white hover:bg-slate-50">
          <h3 className="font-semibold text-slate-900">Log Activity</h3>
          <p className="text-slate-600 mt-1">Tree planting, clean-ups, audits, quizzes.</p>
        </a>

        <a href="/dashboard/school/leaderboard" className="rounded-xl p-6 ring-1 ring-slate-200 bg-white hover:bg-slate-50">
          <h3 className="font-semibold text-slate-900">Leaderboard</h3>
          <p className="text-slate-600 mt-1">See top-performing clubs.</p>
        </a>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Top Clubs</h2>
        <ul className="space-y-2">
          {(topClubs ?? []).map((row, i) => (
            <li key={row.club_name} className="flex items-center justify-between rounded-xl bg-white ring-1 ring-slate-200 p-4">
              <div className="flex items-center gap-3">
                <span className="size-8 grid place-items-center rounded-full bg-emerald-50 font-semibold text-emerald-700">{i + 1}</span>
                <span className="font-medium text-slate-800">{row.club_name}</span>
              </div>
              <span className="font-bold text-slate-900 tabular-nums">{row.total_points}</span>
            </li>
          ))}

          {(!topClubs || topClubs.length === 0) && (
            <li className="rounded-xl bg-white ring-1 ring-slate-200 p-4 text-slate-600">
              No data yet. Log your first activity to start the leaderboard.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
