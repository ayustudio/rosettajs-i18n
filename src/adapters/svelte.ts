// src/adapters/svelte.ts

import { writable } from 'svelte/store';
import Rosetta from '../core';

export const createRosettaStore = (rosetta: Rosetta) => {
  const { subscribe, update } = writable(rosetta);

  return {
    subscribe,
    setLanguage: (language: string) => {
      update(r => {
        r.setLanguage(language);
        return r;
      });
    },
    t: (key: string, params?: Record<string, any>) => rosetta.t(key, params),
    formatNumber: (number: number, options?: Intl.NumberFormatOptions) =>
      rosetta.formatNumber(number, options),
    formatDate: (date: Date | number, options?: Intl.DateTimeFormatOptions) =>
      rosetta.formatDate(date, options),
    formatPlural: (count: number, options: Record<string, string>) =>
      rosetta.formatPlural(count, options),
  };
};
