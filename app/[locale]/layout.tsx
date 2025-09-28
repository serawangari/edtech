import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [{locale:'en'},{locale:'fr'},{locale:'sw'}];
}

export default async function LocaleLayout({
  children, params: { locale }
}: { children: React.ReactNode; params: { locale: 'en'|'fr'|'sw' } }) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (e) {
    notFound();
  }
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
