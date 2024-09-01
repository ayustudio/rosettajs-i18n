// types/index.d.ts

declare module 'rosettajs-i18n' {
  export interface RosettaOptions {
    language: string;
    fallbackLanguage?: string;
    translations: Record<string, any>;
    interpolation?: {
      prefix?: string;
      suffix?: string;
    };
    numberFormat?: Intl.NumberFormatOptions;
    dateFormat?: Intl.DateTimeFormatOptions;
    plugins?: Plugin[];
  }

  export interface Plugin {
    name: string;
    install: (rosetta: Rosetta) => void;
  }

  export class Rosetta {
    constructor(options: RosettaOptions);

    t(key: string, params?: Record<string, any>): string;
    setLanguage(language: string): void;
    formatNumber(number: number, options?: Intl.NumberFormatOptions): string;
    formatDate(date: Date | number, options?: Intl.DateTimeFormatOptions): string;
    formatPlural(count: number, options: Record<string, string>): string;

    // Plugin-specific methods (these will be added dynamically by plugins)
    convertCurrency?: (amount: number, from: string, to: string) => number;
    isRTL?: () => boolean;
    formatPluralAdvanced?: (count: number, options: Record<string, string>) => string;
    parseNumber?: (value: string) => number;
    parseDate?: (value: string) => Date;
    detectLanguage?: () => string;
    generateStaticRoutes?: (routes: string[]) => Array<{ route: string; languages: string[] }>;
  }

  // React adapter
  import { FC, ReactNode } from 'react';

  export const RosettaProvider: FC<{ rosetta: Rosetta; children: ReactNode }>;
  export function useRosetta(): Rosetta;
  export function useTranslation(): {
    t: Rosetta['t'];
    formatNumber: Rosetta['formatNumber'];
    formatDate: Rosetta['formatDate'];
    formatPlural: Rosetta['formatPlural'];
  };

  // Vue adapter
  import { Plugin as VuePlugin } from 'vue';

  export function createRosettaPlugin(rosetta: Rosetta): VuePlugin;
  export function useRosetta(): Rosetta;

  // Svelte adapter
  import { Readable } from 'svelte/store';

  export function createRosettaStore(rosetta: Rosetta): Readable<Rosetta> & {
    setLanguage: (language: string) => void;
    t: Rosetta['t'];
    formatNumber: Rosetta['formatNumber'];
    formatDate: Rosetta['formatDate'];
    formatPlural: Rosetta['formatPlural'];
  };

  // Plugins
  export const currencyConversionPlugin: Plugin;
  export const rtlSupportPlugin: Plugin;
  export const advancedPluralizationPlugin: Plugin;
  export const parsingPlugin: Plugin;
  export const languageDetectionPlugin: Plugin;
  export const ssrSupportPlugin: Plugin;

  // Default export
  export default Rosetta;
}
