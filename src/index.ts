// src/index.ts

import Rosetta from './core';
import {
  currencyConversionPlugin,
  rtlSupportPlugin,
  advancedPluralizationPlugin,
  parsingPlugin,
  languageDetectionPlugin,
  ssrSupportPlugin
} from './plugins';

// React adapter
import { RosettaProvider as ReactProvider, useRosetta as useReactRosetta, useTranslation as useReactTranslation } from './adapters/react';

// Vue adapter
import { createRosettaPlugin as createVuePlugin, useRosetta as useVueRosetta } from './adapters/vue';

// Svelte adapter
import { createRosettaStore } from './adapters/svelte';

// Preact adapter
import { RosettaProvider as PreactProvider, useRosetta as usePreactRosetta, useTranslation as usePreactTranslation } from './adapters/preact';

export {
  Rosetta as default,
  currencyConversionPlugin,
  rtlSupportPlugin,
  advancedPluralizationPlugin,
  parsingPlugin,
  languageDetectionPlugin,
  ssrSupportPlugin,
  ReactProvider,
  useReactRosetta,
  useReactTranslation,
  createVuePlugin,
  useVueRosetta,
  createRosettaStore,
  PreactProvider,
  usePreactRosetta,
  usePreactTranslation
};

// Types
export * from './types';
