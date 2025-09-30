// next-intl.config.ts
export const locales = ['en'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';
export const localePrefix = 'as-needed' as const;

const config = {
  locales,
  defaultLocale,
  localePrefix
} as const;

export default config;

