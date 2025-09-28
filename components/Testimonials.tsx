import Separator from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

export default function Testimonials() {
  const quotes = [
    { who: 'Headteacher, Nairobi County', text: 'Our Green Club grew from 5 to 50 students, and weekly planning got so much easier.' },
    { who: 'CSR Manager, Telco', text: 'Transparent dashboards meant our ESG report wrote itself.' },
    { who: 'NGO Program Lead', text: 'We scaled from 2 to 10 schools without adding staff.' }
  ];
  return (
    <section className="py-20 border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">Loved by schools and sponsors</h2>
          <p className="mt-3 text-gray-600">Real outcomes for real people.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <Card key={q.who} className="rounded-2xl h-full">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <p className="text-gray-800">“{q.text}”</p>
                <Separator className="my-4" />
                <div className="text-sm text-gray-600">{q.who}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
