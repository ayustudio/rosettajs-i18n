# rosettajs-i18n

A lightweight, flexible internationalization (i18n) library for small to medium e-commerce sites.

## Features

- Basic translation with interpolation
- Pluralization supporting common European languages
- Number and date formatting
- Small bundle size (~10KB minified)
- Plugin system for extended functionality
- Framework adapters for React, Vue, Svelte, and Preact
- TypeScript support
- Testing utilities

... (previous content remains the same)

### Framework Adapters

... (previous adapters remain the same)

#### Preact

```jsx
/** @jsx h */
import { h } from 'preact';
import Rosetta, { RosettaProvider, useTranslation } from 'rosettajs-i18n';

const rosetta = new Rosetta(/* options */);

function App() {
  return (
    <RosettaProvider rosetta={rosetta}>
      <MyComponent />
    </RosettaProvider>
  );
}

function MyComponent() {
  const { t, formatPlural } = useTranslation();

  return (
    <div>
      <h1>{t('greeting', { name: 'World' })}</h1>
      <p>{formatPlural(3, t('items'))}</p>
    </div>
  );
}
```

... (rest of the content remains the same)

## Comparison with Alternatives

| Feature | rosettajs-i18n | react-i18next | vue-i18n | preact-i18next |
|---------|----------------|---------------|----------| ---------------|
| Bundle size | ~10KB | ~40KB | ~20KB | ~30KB |
| Framework support | React, Vue, Svelte, Preact | React | Vue | Preact |
| Plugin system | Yes | Limited | Yes | Limited |
| E-commerce focus | Yes | No | No | No |
| SSR support | Yes (plugin) | Yes | Yes | Yes |

... (rest of the content remains the same)
