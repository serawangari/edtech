// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const SEGMENT_KEY = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;

  return (
    <html lang="en">
      <body>
        {children}

        
      </body>
    </html>
  );
}

