// src/adapters/preact.tsx

import { createContext, useContext, useState, useEffect } from 'preact/hooks';
import { ComponentChildren, FunctionComponent } from 'preact';
import Rosetta from '../core';

const RosettaContext = createContext<Rosetta | null>(null);

export const RosettaProvider: FunctionComponent<{ rosetta: Rosetta; children: ComponentChildren }> = ({ rosetta, children }) => {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    const originalSetLanguage = rosetta.setLanguage;
    rosetta.setLanguage = (language: string) => {
      originalSetLanguage.call(rosetta, language);
      setUpdate(prev => prev + 1);
    };
  }, [rosetta]);

  return <RosettaContext.Provider value={rosetta}>{children}</RosettaContext.Provider>;
};

export const useRosetta = () => {
  const rosetta = useContext(RosettaContext);
  if (!rosetta) {
    throw new Error('useRosetta must be used within a RosettaProvider');
  }
  return rosetta;
};

export const useTranslation = () => {
  const rosetta = useRosetta();
  return {
    t: rosetta.t.bind(rosetta),
    formatNumber: rosetta.formatNumber.bind(rosetta),
    formatDate: rosetta.formatDate.bind(rosetta),
    formatPlural: rosetta.formatPlural.bind(rosetta),
  };
};
