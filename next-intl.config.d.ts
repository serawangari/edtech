declare module './next-intl.config.mjs' {
  const config: {
    locales: readonly string[];
    defaultLocale: string;
    localePrefix?: string;
  };
  export default config;
}
