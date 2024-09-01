// src/core.ts

import { pluralRules } from './plurals';
import { Plugin } from './plugins';

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

class Rosetta {
  private language: string;
  private fallbackLanguage: string;
  private translations: Record<string, any>;
  private interpolationRegex: RegExp;
  private numberFormat: Intl.NumberFormatOptions;
  private dateFormat: Intl.DateTimeFormatOptions;
  private plugins: Plugin[] = [];

  constructor(options: RosettaOptions) {
    this.language = options.language;
    this.fallbackLanguage = options.fallbackLanguage || options.language;
    this.translations = options.translations;
    this.interpolationRegex = new RegExp(
      `${options.interpolation?.prefix || '{{'}(.+?)${options.interpolation?.suffix || '}}'}`,
      'g'
    );
    this.numberFormat = options.numberFormat || {};
    this.dateFormat = options.dateFormat || {};

    if (options.plugins) {
      this.plugins = options.plugins;
      this.plugins.forEach(plugin => plugin.install(this));
    }
  }

  t(key: string, params?: Record<string, any>): string {
    const translation = this.getTranslation(key);
    return this.interpolate(translation, params);
  }

  setLanguage(language: string): void {
    this.language = language;
  }

  formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
    const formatOptions = { ...this.numberFormat, ...options };
    return new Intl.NumberFormat(this.language, formatOptions).format(number);
  }

  formatDate(date: Date | number, options?: Intl.DateTimeFormatOptions): string {
    const formatOptions = { ...this.dateFormat, ...options };
    return new Intl.DateTimeFormat(this.language, formatOptions).format(date);
  }

  formatPlural(count: number, options: Record<string, string>): string {
    const rule = pluralRules[this.language]?.(count) || 'other';
    return options[rule] || options.other || '';
  }

  private getTranslation(key: string): string {
    const keys = key.split('.');
    let translation: any = this.translations[this.language];

    for (const k of keys) {
      translation = translation?.[k];
      if (translation === undefined) break;
    }

    if (translation === undefined && this.language !== this.fallbackLanguage) {
      translation = this.translations[this.fallbackLanguage];
      for (const k of keys) {
        translation = translation?.[k];
        if (translation === undefined) break;
      }
    }

    return typeof translation === 'string' ? translation : key;
  }

  private interpolate(translation: string, params?: Record<string, any>): string {
    if (!params) return translation;

    return translation.replace(this.interpolationRegex, (_, key) => {
      return params[key] !== undefined ? String(params[key]) : `{{${key}}}`;
    });
  }
}

export default Rosetta;
