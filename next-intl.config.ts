// next-intl.config.ts
export const locales = ['en'] as const;      // add 'sw' later if you want
export const defaultLocale = 'en';
export const localePrefix = 'as-needed';

const config = {locales, defaultLocale, localePrefix};
export default config;

