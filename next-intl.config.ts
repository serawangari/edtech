// next-intl.config.ts
import type {MiddlewareConfig} from 'next-intl/middleware';

const config = {
  locales: ['en', 'fr', 'sw'] as const,
  defaultLocale: 'en',
  // 'as-needed' keeps /en optional on root if you redirect, otherwise use 'always'
  localePrefix: 'as-needed'
} satisfies MiddlewareConfig;

export default config;


