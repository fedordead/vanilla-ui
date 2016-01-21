# Vanilla UI

UI Components written in ES6. Nothing artificial, all organic!

## Features

* ES6 source code.
* Webpack for module loading.
* [ESLint](http://eslint.org/).
* Tested with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).

## Overview

    .
    ├── lib                     # Compiled library (ES5)
    ├── src                     # ES6 Source files
    ├── docs                    # Documentation files
    ├── test                    # Automated tests
    ├── tools                   # Tools and utilities
    ├── .babelrc                # Babel configuration
    ├── .eslint                 # eslint configuration
    ├── webpack.config.js       # webpack configuration
    ├── package.json            # npm configuration
    ├── LICENSE
    └── README.md

## Getting started

1. Setting up the name of your library
  * Open `webpack.config.js` file and change the value of `libraryName` variable.
  * Open `package.json` file and change the value of `main` property so it matches the name of your library.
2. Build your library
  * Run `npm install` to get the project's dependencies
  * Run `npm run build` to produce minified version of your library.
3. Development mode
  * Having all the dependencies installed run `npm run dev`. This command will generate an non-minified version of your library and will run a watcher so you get the compilation on file change.
4. Running the tests
  * Run `npm run test`

## Scripts

* `npm run build` - produces production version of your library under the `lib` folder
* `npm run dev` - produces development version of your library and runs a watcher
* `npm run test` - well ... it runs the tests :)

## Boilerplate based on

* [ES6 starter kit](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)
