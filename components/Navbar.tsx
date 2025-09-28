'use client';
import Button from '@/components/ui/button';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const t = useTranslations();
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/en" className="flex items-center gap-2" aria-label="Leafscapes home">
          <Leaf className="h-6 w-6" />
          <span className="font-bold tracking-tight">Leafscapes</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features">{t('nav.features')}</a>
          <a href="#audiences">{t('nav.audiences')}</a>
          <a href="#impact">{t('nav.impact')}</a>
          <a href="#pricing">{t('nav.pricing')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
          <Button><Link href="/en/(routes)/schools">Get started</Link></Button>
        </div>
      </div>
    </header>
  );
}
