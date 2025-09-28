import Button from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Pricing() {
  const tiers = [
    { name: 'Starter (Schools)', price: 'Free', features: ['1 club','Leaderboards','Manual reports'], cta: 'Start free' },
    { name: 'Growth (Schools)', price: 'KES 29,000/mo', features: ['Up to 10 clubs','Curriculum & approvals','PDF exports'], cta: 'Choose Growth' },
    { name: 'Sponsor (Corporate)', price: 'Custom', features: ['Cohort funding','Impact dashboards','Employee volunteering'], cta: 'Book a demo' }
  ];
  return (
    <section id="pricing" className="py-20 border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">Packages for any rollout</h2>
          <p className="mt-3 text-gray-600">Start small or go county-wide—upgrade anytime.</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className="rounded-2xl">
              <CardHeader><CardTitle className="flex items-center justify-between"><span>{tier.name}</span><span className="text-2xl font-extrabold">{tier.price}</span></CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f) => (<li key={f} className="flex items-start gap-2 text-gray-700">• {f}</li>))}
                </ul>
                <Button className="w-full">{tier.cta}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
