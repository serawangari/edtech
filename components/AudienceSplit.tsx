import Button from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Users, Building2, School } from 'lucide-react';

export default function AudienceSplit() {
  const items = [
    { icon: School, title: 'For Schools', desc: 'Plug-and-play Green Club curriculum, student leaderboards, easy reporting.', bullets: ['Ready-made lessons','Photo proof uploads','Recognition badges'], cta: 'Start free' },
    { icon: Building2, title: 'For Corporates', desc: 'Sponsor clubs with full transparency and CSR-ready KPIs.', bullets: ['Impact dashboards','Fund tracking','Employee volunteering'], cta: 'Book a demo' },
    { icon: Users, title: 'For NGOs & Investors', desc: 'Scale programs across schools and prove outcomes with auditable data.', bullets: ['Cohort management','Outcome exports','Storytelling tools'], cta: 'Partner with us' }
  ];
  return (
    <section id="audiences" className="py-20 border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">Built for every stakeholder</h2>
          <p className="mt-3 text-gray-600">Schools run projects. Corporates fund them. NGOs scale impact. Everyone sees results.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc, bullets, cta }) => (
            <Card key={title} className="rounded-2xl">
              <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Icon className="h-5 w-5" /> {title}</CardTitle></CardHeader>
              <CardContent>
                <p className="text-gray-600">{desc}</p>
                <ul className="mt-4 space-y-2">
                  {bullets.map((b) => (<li key={b} className="flex items-start gap-2 text-gray-700"><CheckCircle2 className="h-5 w-5 mt-0.5" /> {b}</li>))}
                </ul>
                <Button className="mt-6 w-full">{cta}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
