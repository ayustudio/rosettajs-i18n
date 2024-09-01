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

## Installation

```bash
npm install rosettajs-i18n
```

## Basic Usage

```javascript
import Rosetta from 'rosettajs-i18n';

const rosetta = new Rosetta({
  language: 'en',
  fallbackLanguage: 'en',
  translations: {
    en: {
      greeting: 'Hello, {{name}}!',
      items: {
        one: 'You have {{count}} item',
        other: 'You have {{count}} items',
      },
    },
    es: {
      greeting: '¡Hola, {{name}}!',
      items: {
        one: 'Tienes {{count}} artículo',
        other: 'Tienes {{count}} artículos',
      },
    },
  },
});

console.log(rosetta.t('greeting', { name: 'John' })); // Output: Hello, John!
console.log(rosetta.formatPlural(1, rosetta.t('items'))); // Output: You have 1 item
console.log(rosetta.formatPlural(3, rosetta.t('items'))); // Output: You have 3 items

rosetta.setLanguage('es');

console.log(rosetta.t('greeting', { name: 'Juan' })); // Output: ¡Hola, Juan!
console.log(rosetta.formatPlural(1, rosetta.t('items'))); // Output: Tienes 1 artículo
console.log(rosetta.formatPlural(3, rosetta.t('items'))); // Output: Tienes 3 artículos
```

## Advanced Usage

### Using Plugins

```javascript
import Rosetta, { currencyConversionPlugin, rtlSupportPlugin } from 'rosettajs-i18n';

const rosetta = new Rosetta({
  // ... other options
  plugins: [currencyConversionPlugin, rtlSupportPlugin],
});

// Using currency conversion plugin
console.log(rosetta.convertCurrency(100, 'USD', 'EUR')); // Output: 120 (example conversion)

// Using RTL support plugin
console.log(rosetta.isRTL()); // Output: false (for non-RTL languages)
```

### Framework Adapters

#### React

```jsx
import React from 'react';
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

#### Vue

```vue
<template>
  <div>
    <h1>{{ $t('greeting', { name: 'World' }) }}</h1>
    <p>{{ $formatPlural(3, $t('items')) }}</p>
  </div>
</template>

<script>
import { createApp } from 'vue';
import Rosetta, { createRosettaPlugin } from 'rosettajs-i18n';

const rosetta = new Rosetta(/* options */);
const app = createApp(/* your app component */);
app.use(createRosettaPlugin(rosetta));
app.mount('#app');
</script>
```

#### Svelte

```svelte
<script>
import Rosetta, { createRosettaStore } from 'rosettajs-i18n';

const rosetta = new Rosetta(/* options */);
const { t, formatPlural } = createRosettaStore(rosetta);
</script>

<h1>{$t('greeting', { name: 'World' })}</h1>
<p>{$formatPlural(3, $t('items'))}</p>
```

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

## E-commerce Focus

rosettajs-i18n is designed with e-commerce sites in mind:

- Built-in support for currency formatting and conversion
- SEO-friendly features (like URL handling in SSR plugin)
- Lightweight core for fast page loads
- Extensible plugin system for advanced features

## Performance Optimization

- Core functionality is kept lightweight
- Tree-shaking support for unused features
- Efficient pluralization rules

## Comparison with Alternatives

| Feature | rosettajs-i18n | react-i18next | vue-i18n | preact-i18next |
|---------|----------------|---------------|----------| ---------------|
| Bundle size | ~10KB | ~40KB | ~20KB | ~30KB |
| Framework support | React, Vue, Svelte, Preact | React | Vue | Preact |
| Plugin system | Yes | Limited | Yes | Limited |
| E-commerce focus | Yes | No | No | No |
| SSR support | Yes (plugin) | Yes | Yes | Yes |

## FAQ

Q: Can I use rosettajs-i18n with other frameworks?
A: While we provide official adapters for React, Vue, Svelte, and Preact, you can use the core functionality with any JavaScript framework.

Q: How do I contribute to rosettajs-i18n?
A: We welcome contributions! Please see our CONTRIBUTING.md file for guidelines.

Q: Is rosettajs-i18n suitable for large-scale applications?
A: While rosettajs-i18n is designed for small to medium e-commerce sites, it can be used in larger applications. However, for very large or complex projects, you might want to consider more feature-rich alternatives.

## License

MIT License. See LICENSE file for details.
