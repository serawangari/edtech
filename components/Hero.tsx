'use client';
import { useTranslations } from 'next-intl';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import { ShieldCheck, LineChart } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations();
  const count = 12000;
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <Badge className="mb-4">CSR • Green Clubs • IoT Trees</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {t('hero.title', { count })}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{t('hero.subtitle')}</p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <Button><Link href="/en/(routes)/schools">{t('cta.schools')}</Link></Button>
            <Button variant="outline"><Link href="/en/(routes)/corporates">{t('cta.corporates')}</Link></Button>
            <Button variant="secondary"><Link href="/en/(routes)/ngos">{t('cta.ngos')}</Link></Button>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Data privacy by design</div>
            <div className="flex items-center gap-2"><LineChart className="h-4 w-4" /> CSR-ready metrics</div>
          </div>
        </div>
        <div className="aspect-[16/10] w-full rounded-2xl shadow-xl border bg-white" />
      </div>
    </section>
  );
}
