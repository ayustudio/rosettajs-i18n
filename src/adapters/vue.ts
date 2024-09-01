// src/adapters/vue.ts

import { reactive, inject, provide } from 'vue';
import Rosetta from '../core';

const RosettaSymbol = Symbol();

export const createRosettaPlugin = (rosetta: Rosetta) => ({
  install: (app: any) => {
    const reactiveRosetta = reactive(rosetta);
    app.provide(RosettaSymbol, reactiveRosetta);

    app.config.globalProperties.$t = reactiveRosetta.t.bind(reactiveRosetta);
    app.config.globalProperties.$formatNumber = reactiveRosetta.formatNumber.bind(reactiveRosetta);
    app.config.globalProperties.$formatDate = reactiveRosetta.formatDate.bind(reactiveRosetta);
    app.config.globalProperties.$formatPlural = reactiveRosetta.formatPlural.bind(reactiveRosetta);
  },
});

export const useRosetta = () => {
  const rosetta = inject<Rosetta>(RosettaSymbol);
  if (!rosetta) {
    throw new Error('useRosetta must be used within a component with the Rosetta plugin installed');
  }
  return rosetta;
};
