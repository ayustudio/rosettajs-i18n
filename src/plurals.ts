// src/plurals.ts

type PluralRule = (n: number) => 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

export const pluralRules: Record<string, PluralRule> = {
  en: (n: number) => (n === 1 ? 'one' : 'other'),
  fr: (n: number) => (n === 0 || n === 1 ? 'one' : 'other'),
  de: (n: number) => (n === 1 ? 'one' : 'other'),
  es: (n: number) => (n === 1 ? 'one' : 'other'),
  it: (n: number) => (n === 1 ? 'one' : 'other'),
  // Add more languages as needed
};
