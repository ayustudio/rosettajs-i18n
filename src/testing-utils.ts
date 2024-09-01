// src/testing-utils.ts

import Rosetta, { RosettaOptions } from './core';

export function createTestRosetta(options: Partial<RosettaOptions> = {}) {
  const defaultOptions: RosettaOptions = {
    language: 'en',
    fallbackLanguage: 'en',
    translations: {
      en: {
        test: 'Test',
        interpolation: 'Hello, {{name}}!',
        plural: {
          one: '{{count}} item',
          other: '{{count}} items',
        },
      },
    },
  };

  return new Rosetta({ ...defaultOptions, ...options });
}

export function mockPlugin(name: string) {
  return {
    name,
    install: jest.fn(),
  };
}

export function expectTranslation(rosetta: Rosetta, key: string, expected: string, params?: Record<string, any>) {
  expect(rosetta.t(key, params)).toBe(expected);
}

export function expectPlural(rosetta: Rosetta, count: number, expected: string) {
  expect(rosetta.formatPlural(count, {
    one: '{{count}} item',
    other: '{{count}} items',
  })).toBe(expected);
}

export function expectNumberFormat(rosetta: Rosetta, number: number, expected: string, options?: Intl.NumberFormatOptions) {
  expect(rosetta.formatNumber(number, options)).toBe(expected);
}

export function expectDateFormat(rosetta: Rosetta, date: Date, expected: string, options?: Intl.DateTimeFormatOptions) {
  expect(rosetta.formatDate(date, options)).toBe(expected);
}
