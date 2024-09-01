import React from 'react';
import Rosetta, { RosettaProvider, useTranslation } from 'rosettajs-i18n';

const rosetta = new Rosetta({
  language: 'en',
  translations: {
    en: {
      greeting: 'Hello, {{name}}!',
      items: { one: '{{count}} item', other: '{{count}} items' },
    },
    es: {
      greeting: '¡Hola, {{name}}!',
      items: { one: '{{count}} artículo', other: '{{count}} artículos' },
    },
  },
});

function TranslatedComponent() {
  const { t, formatPlural } = useTranslation();
  return (
    <div>
      <h1>{t('greeting', { name: 'World' })}</h1>
      <p>{formatPlural(3, t('items'))}</p>
    </div>
  );
}

function App() {
  return (
    <RosettaProvider rosetta={rosetta}>
      <TranslatedComponent />
    </RosettaProvider>
  );
}

export default App;
