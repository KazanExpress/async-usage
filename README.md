<h1 align="center">
  <div id="logo" style="width:500px;height:85px;margin:10px auto">
    <div style="width:470;height:65px;margin:0 auto;text-aligh:center;background:#242424;border-radius:8px;box-shadow:0 1px 10px black;">
      <div style="margin:0 auto;text-aligh:center;padding:14px;font-family:Consolas,monospace;font-size:28px">
        () <span style="color:#66D9EF">=></span> <span style="color:#F92672">import</span>(<span style="color:#FFEE99">'async-usage'</span>)
      </div>
    </div>
  </div>
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

It's a simple tool for creating environment specific dynamic import factories with pluginable functionality.

You can use it to reduce code repetition in your project's imports.

## TLDR

This tool allows you to create [dynamic import factories](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports) to help your project be KISS and DRY. 😉

Mostly designed to work with [webpack](http://webpackjs.org), but can be easily tuned to work with other bundlers or even native browser dynamic imports.

Its simple - just create your specific async chunk use-case:

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

## API
