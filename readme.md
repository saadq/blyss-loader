# blyss-loader

webpack loader for linting your code with [saadq/blyss](https://github.com/saadq/blyss).

## Installation

```
npm install blyss-loader --save-dev
```

## Usage

With Webpack 2:

```js
// webpack.config.js
const webpack = require('webpack')

const config = {
  // ...
  module: {
    rules: [
      {
        // set up blyss-loader as a preloader
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'blyss-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          // Emit errors instead of warnings (default = false)
          error: false,
          // enable snazzy output (default = true)
          snazzy: true,
          // other config options to be passed through to blyss e.g.
          parser: 'babel-eslint'
        }
      },
      // other loaders...
    ]
  }
}

module.exports = config
```

## Licence

ISC (Copyright (c) 2015, Tim Oxley)
