<template>
  <div>
    <h1>{{ $t('greeting', { name: 'World' }) }}</h1>
    <p>{{ $formatPlural(3, $t('items')) }}</p>
  </div>
</template>

<script>
import { createApp } from 'vue';
import Rosetta, { createRosettaPlugin } from 'rosettajs-i18n';

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

const app = createApp({});
app.use(createRosettaPlugin(rosetta));

export default app;
</script>
