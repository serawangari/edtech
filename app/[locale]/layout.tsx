// app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getLocale} from 'next-intl/server';
import '../globals.css';

export const metadata = {
  title: 'Leafscapes',
  description: 'Environmental EdTech for schools, NGOs & corporates'
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Ensure locale is valid:
  const locale = params.locale ?? (await getLocale());

  // Load messages for this locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

