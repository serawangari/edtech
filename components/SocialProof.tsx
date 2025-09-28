import { Card, CardContent } from '@/components/ui/card';

export default function SocialProof() {
  const logos = ['NGO One','NGO Two','School A','School B'];
  const stats = [
    { k: 'Schools', v: '48' },
    { k: 'Students', v: '12,930' },
    { k: 'Trees', v: '87,214' }
  ];
  return (
    <section className="py-10 border-t bg-white" aria-label="Social proof">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-sm text-gray-600">
            <div className="uppercase tracking-wider text-gray-500">Trusted by</div>
            <div className="mt-3 flex flex-wrap gap-3">
              {logos.map((l) => (<span key={l} className="px-3 py-1 rounded-full border bg-gray-50">{l}</span>))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {stats.map(({k,v}) => (
              <Card key={k}><CardContent className="p-4 text-center"><div className="text-xs text-gray-500">{k}</div><div className="text-2xl font-bold">{v}</div></CardContent></Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
