// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const SEGMENT_KEY = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;

  return (
    <html lang="en">
      <body>
        {children}

        {/* Load Segment only if a key is set */}
        {SEGMENT_KEY ? (
          <Script
            id="segment"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(){var analytics=window.analytics=window.analytics||[]; ... // your snippet
              `,
            }}
          />
        ) : null}
      </body>
    </html>
  );
}

