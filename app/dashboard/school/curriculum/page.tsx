'use client';

import React, {useEffect, useMemo, useState} from 'react';

/** Types */
type Session = {
  id: string;
  month: number;
  title: string;
  summary: string;
  objectives: string[];
  materials?: string[];
  estimatedMinutes?: number;
  points?: number;
};

type Module = {
  month: number;
  theme: string;
  sessions: Session[];
};

/** Dummy data */
const MODULES: Module[] = [
  {
    month: 1,
    theme: 'Getting Started: What is a Green Club?',
    sessions: [
      {
        id: 'm1-s1',
        month: 1,
        title: 'Welcome & Club Setup',
        summary: 'Introduce the club, elect leaders, agree on values.',
        objectives: [
          'Understand club purpose and expectations',
          'Elect student leaders and assign initial roles',
          'Set meeting day/time for the term'
        ],
        materials: ['Name tags', 'Marker pens', 'Large paper for rules'],
        estimatedMinutes: 40,
        points: 10
      },
      {
        id: 'm1-s2',
        month: 1,
        title: 'Our Environment at School',
        summary: 'Walk-about audit of the school environment.',
        objectives: [
          'Observe litter, water points, trees, and garden areas',
          'Identify 3 quick wins for improvement',
          'Assign “Water Monitor” and “Clean-up Captain”'
        ],
        materials: ['Clipboards', 'Audit checklist (print)', 'Camera/phone'],
        estimatedMinutes: 50,
        points: 15
      },
      {
        id: 'm1-s3',
        month: 1,
        title: 'Safety & Safeguarding',
        summary: 'Agree on safety rules for field work and tool use.',
        objectives: [
          'Know basic safety rules for clean-up and planting',
          'Identify a staff safety lead',
          'Sign code of conduct'
        ],
        materials: ['Printed safety sheet', 'Parents note (optional)'],
        estimatedMinutes: 30,
        points: 10
      }
    ]
  },
  {
    month: 2,
    theme: 'Waste & Clean-ups',
    sessions: [
      {
        id: 'm2-s1',
        month: 2,
        title: 'Waste Audit 101',
        summary: 'Sort and weigh waste to learn the biggest streams.',
        objectives: [
          'Learn how to separate organic vs plastics vs paper',
          'Measure baseline waste by category',
          'Set a target for next month'
        ],
        materials: ['Gloves', 'Sacks', 'Weighing scale', 'Tarp'],
        estimatedMinutes: 60,
        points: 20
      },
      {
        id: 'm2-s2',
        month: 2,
        title: 'Clean-up Day',
        summary: 'School compound or local stream clean-up.',
        objectives: [
          'Plan routes and safety roles',
          'Conduct clean-up and record bags filled',
          'Reflect: what went well?'
        ],
        materials: ['Gloves', 'Sacks', 'First aid kit'],
        estimatedMinutes: 90,
        points: 25
      }
    ]
  },
  {
    month: 3,
    theme: 'Trees & Water',
    sessions: [
      {
        id: 'm3-s1',
        month: 3,
        title: 'Tree Planting Basics',
        summary: 'Right tree, right place, right way.',
        objectives: [
          'Learn spacing, mulching, and staking',
          'Prepare a small nursery or select planting sites',
          'Adopt-a-tree roster'
        ],
        materials: ['Seedlings', 'Mulch', 'Watering cans', 'Stakes/twine'],
        estimatedMinutes: 60,
        points: 30
      },
      {
        id: 'm3-s2',
        month: 3,
        title: 'Watering & Care',
        summary: 'Create watering schedule and care checklist.',
        objectives: [
          'Assign “Water Monitors”',
          'Create weekly care checklist',
          'Record survival rates'
        ],
        materials: ['Printed rota', 'Notebook', 'Measuring jug'],
        estimatedMinutes: 45,
        points: 15
      }
    ]
  }
];

/** Local storage helpers */
const LS_KEY = 'leafscapes.curriculum.completed.v1';
function loadCompleted(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveCompleted(state: Record<string, boolean>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

/** Page component (default export required) */
export default function CurriculumPage() {
  const [activeMonth, setActiveMonth] = useState<number>(1);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => setCompleted(loadCompleted()), []);

  const allSessions = useMemo(() => MODULES.flatMap(m => m.sessions), []);
  const totalSessions = allSessions.length;
  const completedCount = useMemo(
    () => Object.values(completed).filter(Boolean).length,
    [completed]
  );
  const earnedPoints = useMemo(
    () => allSessions.reduce((sum, s) => sum + (completed[s.id] ? (s.points ?? 10) : 0), 0),
    [completed, allSessions]
  );

  const month = MODULES.find(m => m.month === activeMonth) ?? MODULES[0];

  function toggleComplete(id: string) {
    setCompleted(prev => {
      const next = {...prev, [id]: !prev[id]};
      saveCompleted(next);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Green Club Curriculum</h1>
          <p className="text-slate-600">
            40-week journey • demo shows Months 1–3 • progress is saved in your browser.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Completed" value={`${completedCount}/${totalSessions}`} />
          <Stat label="Total Sessions" value={`${totalSessions}`} />
          <Stat label="Points Earned" value={`${earnedPoints}`} />
        </div>
      </header>

      <nav className="relative">
        <div className="flex overflow-x-auto no-scrollbar gap-2 rounded-2xl bg-white p-2 ring-1 ring-slate-200">
          {MODULES.map(m => (
            <button
              key={m.month}
              onClick={() => setActiveMonth(m.month)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition
                ${activeMonth === m.month
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100 hover:bg-emerald-100'}`}
            >
              Month {m.month}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-slate-500">
          Theme: <span className="font-medium text-slate-700">{month.theme}</span>
        </p>
      </nav>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {month.sessions.map((s) => (
          <SessionCard
            key={s.id}
            session={s}
            completed={!!completed[s.id]}
            onToggle={() => toggleComplete(s.id)}
          />
        ))}
      </section>

      <footer className="text-sm text-slate-500">
        ✅ Completed sessions add points to your leaderboard. This page uses localStorage only; later we’ll read/write Supabase.
      </footer>
    </div>
  );
}

/** Small components below keep this file a module with exports/imports */
function Stat({label, value}:{label:string; value:string}) {
  return (
    <div className="rounded-xl bg-white p-4 text-center ring-1 ring-slate-200">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

function SessionCard({
  session, completed, onToggle
}: {session: Session; completed: boolean; onToggle: () => void;}) {
  const [open, setOpen] = useState(false);
  const pts = session.points ?? 10;

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              {pts} pts
            </span>
            {session.estimatedMinutes && (
              <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-100">
                {session.estimatedMinutes} min
              </span>
            )}
          </div>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{session.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{session.summary}</p>
        </div>

        <button
          onClick={onToggle}
          className={`rounded-xl px-3 py-2 text-sm font-semibold transition
            ${completed
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'}`}
          aria-pressed={completed}
        >
          {completed ? '✓ Completed' : 'Mark complete'}
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setOpen(v => !v)}
          className="text-sm font-medium text-emerald-700 hover:underline"
          aria-expanded={open}
          aria-controls={`details-${session.id}`}
        >
          {open ? 'Hide details' : 'View details'}
        </button>

        {open && (
          <div id={`details-${session.id}`} className="mt-3 space-y-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Objectives</div>
              <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                {session.objectives.map((o, idx) => <li key={idx}>{o}</li>)}
              </ul>
            </div>

            {session.materials && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Materials</div>
                <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                  {session.materials.map((m, idx) => <li key={idx}>{m}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
