<h1 align="center">
  <img src="logo/async-usage.png">
</h1>

<p align="center">
  <a href="https://travis-ci.org/KazanExpress/async-usage"><img src="https://img.shields.io/travis/KazanExpress/async-usage/master.svg?logo=travis&amp;style=flat-square" alt="Build Status" /></a> <a href="https://coveralls.io/github/KazanExpress/async-usage?branch=master"><img src="https://img.shields.io/coveralls/github/KazanExpress/async-usage/master.svg?style=flat-square" alt="Coverage status" /></a> <a href="https://www.npmjs.com/package/async-usage"><img src="https://img.shields.io/npm/v/async-usage.svg?style=flat-square" alt="npm" /></a> 
  <a href=""><img src="https://img.shields.io/bundlephobia/minzip/async-usage.svg?style=flat-square" alt="npm bundle size (minified)" /></a> <a href=""><img src="https://img.shields.io/badge/dependencies-none-yellow.svg?style=flat-square" alt="dependencies (minified)" /></a>
</p>

<p align="center">
  Declarative dynamic imports for everyone!
</p>

<p align="center"><code>npm i -S async-usage</code></p>


## What is it?

This is a simple tool for creating environment specific dynamic import factories with pluginable functionality.
It allows you to create [dynamic import factories](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports) to help your project be KISS and DRY. 😉

You can use it to reduce code repetition in your project's imports.

Mostly designed to work with [webpack](http://webpackjs.org), but can be easily tuned to work with other bundlers or even native browser dynamic imports.

## TLDR

### General usage

It's simple - just create your specific async chunk use-case:

```ts
// Import the `createAsyncUsage` function
import { createAsyncUsage } from 'async-usage';

// Define the factory function to generate your imports
const importFactory = (path) => import(
  // Baked in webpack's "magic comments"
  /* webpackChunkName: "[request]" */
  /* webpackMode: "lazy" */

  // If using webpack, always start your factory path with a constant string,
  // so that webpack knows where to look to avoid complete module bundling.
  '@/' + path
);

// Create your final usage function
const useComponents = createAsyncUsage(
  importFactory, // Pass the import factory as the 1-st argument
  'components'   // Pass the base path as the second argument
);
```

And then use it 😉:

```ts
const components = useComponents(
  // Object options:
  // key - final imported module name alias
  // value - path to the module, relative to the base path passed into `createAsyncUsage`
  {
    'cool-component-base': 'path/to/cool/component-base',
    'some-component-top': 'path/to/some/component-top',
    'other-component': 'other/component',
  }

// You can then chain the call to avoid unnecessary object spreads
// Aliases for chaining: 'and', 'with'
).and(
  // Array options:
  // value - both path to the module AND its imported alias
  // `/` in the path will be replaced with `-` for the module alias
  [
    'home/page-slider'
  ],
  // Optional absolute path to the module from your importFactory root.
  'pages/home/components'
).clean();


// Result:
components === {
  'cool-component-base': () => import(
    /* webpackChunkName: "[request]" */
    /* webpackMode: "lazy" */
    '@/components/path/to/cool/component-base'
  ),
  'some-component-top': () => import(
    /* webpackChunkName: "[request]" */
    /* webpackMode: "lazy" */
    '@/components/path/to/some-component-top'
  ),
  'other-component': () => import(
    /* webpackChunkName: "[request]" */
    /* webpackMode: "lazy" */
    '@/components/other/component'
  ),
  'home-page-slider': () => import(
    /* webpackChunkName: "[request]" */
    /* webpackMode: "lazy" */
    '@/pages/home/components/home/page-slider'
  )
}
```

### Plugins

It's possible to create custom plugins for `createAsyncUsage`. For a more comprehensive guide see [API/plugins](#api-plugins).

`createAsyncUsage` already comes with two default plugins you can use: [`cachePlugin`](#cache-plugin) and [`ProfilePlugin`](#profile-plugin)

Shortly, the general format for plugins is the following:
```ts
type Plugin = {
  // Called when the usage was just initiated, returning a factory function
  invoked: (path: string, name: string, previousChunk: Promise<Chunk> | undefined) => Promise<Chunk> | undefined;
  
  // Called right before the `import` function is called
  beforeStart: (path: string, name: string, previousChunk: Promise<Chunk> | undefined) => Promise<Chunk> | undefined;

  // Called right after the `import` function is called
  started: (path: string, name: string, newChunk: Promise<Chunk>) => Promise<Chunk> | undefined;

  // Triggered upon successful chunk loading
  resolved: (path: string, name: string, result: Chunk) => Promise<Chunk> | Chunk | undefined;

  // Triggered if there was an error loading a chunk
  rejected: (path: string, name: string, reason) => Promise<Chunk> | Chunk | undefined;
}
```

Any value returned from those functions that is different from `undefined` will be treated as a loading result and returned instead of the the original result. If you want to simply let `async-usage` do its thing - simply return `undefined` from plugin's function.

#### Cache Plugin

This plugin simply caches your chunks in-memory, bypassing the browser request cache.

Useful in case of having a 'no-cache' flag for some assets, while also having a need to conditionally cache some modules.

Usage:
```ts
import { cachePlugin } from 'async-usage';

const use = createAsyncUsage(/* import factory here */, {
  basePath: 'assets',
  plugins: [
    cachePlugin
  ]
});
```

#### Profile Plugin

Logs chunk-loading statistics into the console in a following format:
```
 ┌─ Loading time from chunk being requested to a fully loaded chunk
 │             ┌─ Status of loading the chunk - Loaded | Error | Cached (loaded from cache by cachePlugin)
 │       ┌─────┴─────┐
250 ms ┬ Chunk loaded: footer-sama  ────── Name of the chunk (ususally, the key in a chunk-path map)
       └─ components/footer-sama
          └─────────┬──────────┘
                    └─ Path to the chunk
                       (relative to the base path set in your custom import factory)
```

Usage:
```ts
import { ProfilePlugin } from 'async-usage';

const use = createAsyncUsage(/* import factory here */, {
  basePath: 'assets',
  plugins: [
    new ProfilePlugin('src/assets', 'color: red')
  ]
});
```
