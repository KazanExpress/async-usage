# Async Usage
<!-- 
[![npm](https://img.shields.io/npm/v/parakeet-mapper.svg?style=flat-square)](https://www.npmjs.com/package/parakeet-mapper) 
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/minzip/parakeet-mapper.svg?style=flat-square)]() [![dependencies (minified)](https://img.shields.io/badge/dependencies-none-yellow.svg?style=flat-square)]() -->

> Declarative dynamic imports for everyone!

<br/>

## TLDR

This tool allows you to create [dynamic import factories](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports) to help your project be KISS and DRY. 😉

Its simple - just create your specific async chunk use-case:

```ts
import { createAsyncUsage } from 'async-usage';

const importFactory = (path) => import('@/' + path);

const useComponents = createAsyncUsage(importFactory, {
  basePath: 'components'
});
```


In order to improve chunked component imports and make them SOLID, KISS and DRY, a revolutionary vue-component importing system was implemented.

So instead of the traditional
```js
import SubComponent from '@/components/subComponent';

export default Vue.extend({
  ...
  components: {
    SubComponent
  }
  ...
});
```

we now can do this:

```js
export default Vue.extend({
  ...
  components: use([
    'subComponent'
  ])
  ...
});
```

Notice this? No redundant imports! You just pass component paths and they are converted to names automatically!

Let's try with more components...

<details>
<summary>Traditional</summary>

```js
import SubComponent from '@/components/subComponent';
import coolTable from '@/components/coolTable';
import label from '@/components/label';
import coolInput from '@/components/coolInput';
import card from '@/components/card';
import formComponent from '@/components/formComponent';
import coolSelect from '@/components/coolSelect';
import coolOption from '@/components/coolOption';
import wildcard from '@/components/wildcard';
import radioButton from '@/components/radioButton';
import coolButton from '@/components/coolButton';
import coolCheckbox from '@/components/coolCheckbox';
import photoContainer from '@/components/photoContainer';
import gallery from '@/components/gallery';
import slider from '@/components/slider';
import mainComponent from '@/components/mainComponent';

export default Vue.extend({
  ...
  components: {
    SubComponent,
    coolTable,
    label,
    coolInput,
    card,
    formComponent,
    coolSelect,
    coolOption,
    wildcard,
    radioButton,
    coolButton,
    coolCheckbox,
    photoContainer,
    gallery,
    slider,
    mainComponent,
  }
  ...
});
```

... WOW ... That's huge.
</details>

<details>
<summary>DRY-style</summary>

```js
export default Vue.extend({
  ...
  components: use([
    'subComponent',
    'coolTable',
    'label',
    'coolInput',
    'card',
    'formComponent',
    'coolSelect',
    'coolOption',
    'wildcard',
    'radioButton',
    'coolButton',
    'coolCheckbox',
    'photoContainer',
    'gallery',
    'slider',
    'mainComponent',
  ])
  ...
});
```
</details>

"So what is this magic?" I hear you ask... behold!

The mighty global `use` component factory!

## `use`

Can be used both as [function](#as-function) and as [object](#as-object).

### as `function`:

There are 2 possible overloads:
```ts
// first
(componentMap: ComponentPathMap | Array<string | ComponentPathMap>) => ComponentImportPromiseMap

// second
(componentMap: ComponentPathMap | Array<string | ComponentPathMap>, relativePath: string) => ComponentImportPromiseMap
```

Where `ComponentPathMap` is an object with strings as keys and component paths as values: `{ [name: string]: string }`
and `ComponentImportPromiseMap` is a final vue-compatible component object map.

The first one imports components by their path automatically from the folder `src/components`:
```ts
// As an array: generates resulting component name
//              based on the import path
use([
  // Path to the coolTable component in the `components` folder
  'cool/table',
  'label',
])
/*
results in: {
  'cool-table': () => import('@/components/cool/table'),
  'label': () => import('@/components/label'),
}
*/
```

```ts
// As an object: use this if you need to set custom names for components
//               that differ from their path
use({
  MyCoolTable: 'cool/table',
  MyCoolLabel: 'label',
})
/*
results in: {
  'my-cool-table': () => import('@/components/cool/table'),
  'my-cool-label': () => import('@/components/label'),
}
*/
```

The second one allows for importing multiple components from a certain folder by passing a second argument - `relativePath`:

```ts
use(
  [
    'navigation',
    'header',
    'footer'
  ],
  // Path, relative to the `<root>/src` folder:
  'components/layouts/mobile'
)
```

This overload is typically used with a global `__dirname` variable to import components from a current directory (in pages, for example):

```ts
// *EXAMPLE*: components/layouts/mobile/layout.ts

export default Vue.extend({
  ...
  components: use([
    'navigation',
    'header/small',
    'header/large',
    'footer'
  ], __dirname)
  ...
});
```

### as `object`:

Allows to chain multiple `use`s without the need to spread them into a single object.

So, if you want to import from `node_modules` AND your own components, instead of this:
```ts
{
  ...use([
    'navigation',
    'header/small',
    'header/large',
    'footer'
  ], __dirname),
  ...use([
    'label'
  ])
}
```

it is possible to do this:
```ts
use([
  'navigation',
  'header/small',
  'header/large',
  'footer'
], __dirname)
.and([
  'label'
])
```
Cool, right? 😲

And it's not all!

You also can combine string paths and name maps in arrays to shorten your declarations:
```ts
use([
  'navigation',
  'footer',
  {
    'header': '*/small', // the '*' symbol means that the key will be pasted here to be reused
    // so it's the same as
    // 'header': 'header/small'
  }
], __dirname)
.and([
  'label',
  {
    MySupaCoolTable: 'cool/table',
    MySupaCoolLabel: 'cool/label',
  }
])
```

Woow!!! 😍


But what about node_modules?

Well, this is a hard topic for webpack, so the only valid solution would be to get back to traditional import for this one case when you need a vendor component:
```ts
import VueSimpleSuggest from 'vue-simple-suggest';

export default Vue.extend({
  ...
  components: use([
    // Local components
    'navigation',
    'header/small',
    'header/large',
    'footer'
  ], __dirname).and([
    // Global components
    'label'
  ]).with({
    // Vendor components
    VueSimpleSuggest
  })
  ...
});
```
