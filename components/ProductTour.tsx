import { CheckCircle2 } from 'lucide-react';

export default function ProductTour() {
  const steps = [
    { k: 'Students earn points', v: 'Leaderboards and badges for activities with photo proof' },
    { k: 'Teachers approve', v: 'One-click moderation and progress tracking' },
    { k: 'Sponsors see impact', v: 'Transparent dashboards and CSR-ready exports' }
  ];
  return (
    <section className="py-20 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold">See it in action</h2>
          <p className="mt-3 text-gray-600">Short tour of the student, teacher, and sponsor experience.</p>
          <div className="mt-6 space-y-3">
            {steps.map(({ k, v }) => (
              <div key={k} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5" />
                <div>
                  <div className="font-medium">{k}</div>
                  <div className="text-sm text-gray-600">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="aspect-[16/10] w-full rounded-2xl border bg-gradient-to-br from-white to-emerald-50 grid place-items-center">
            <div className="text-center p-8">
              <div className="text-sm uppercase tracking-wider text-gray-500">Video Placeholder</div>
              <div className="mt-2 text-lg font-medium">Embed Loom/YouTube here</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
