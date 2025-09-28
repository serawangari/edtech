import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Leafscapes',
  description: 'EdTech for climate action – built in Kenya, for the world.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
