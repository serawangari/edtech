import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, ShieldCheck, Globe2, Sparkles } from 'lucide-react';

export default function BenefitsGrid() {
  const items = [
    { icon: LineChart, title: 'Live Dashboards', desc: 'Map trees, sensor feeds, and leaderboards across schools in real time.' },
    { icon: ShieldCheck, title: 'Data Governance', desc: 'Consent, anonymization, and role-based permissions out-of-the-box.' },
    { icon: Globe2, title: 'Multi-language', desc: 'English, Swahili, French—extendable for regional deployments.' },
    { icon: Sparkles, title: 'Gamified', desc: 'Quests, badges, and fun challenges keep students engaged.' }
  ];
  return (
    <section id="features" className="py-20 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">Why teams choose Leafscapes</h2>
          <p className="mt-3 text-gray-600">Outcome-first design: less admin, more real-world action.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="rounded-2xl shadow-sm">
              <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Icon className="h-5 w-5" /> {title}</CardTitle></CardHeader>
              <CardContent className="text-gray-600">{desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
