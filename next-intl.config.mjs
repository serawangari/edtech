import createNextIntlPlugin from 'next-intl/plugin';

// IMPORTANT: path must point to /i18n/request.ts
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl({
  reactStrictMode: true
});
