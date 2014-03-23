coffeelint-stylish [![Build Status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url]
==================
[![Dependency Status][depstat-image]][depstat-url] [![devDependency Status][devdepstat-image]][devdepstat-url]

> Stylish reporter for CoffeeLint http://www.coffeelint.org. Heavily inspired by the beautiful [jshint-stylish](https://github.com/sindresorhus/jshint-stylish).

**Note:** This is soley to be used with CoffeeLint's [runtime](http://www.coffeelint.org/#api), i.e. `coffeelint.lint(source, configuration)`, not with the `coffeelint` commandline tool. Currently the commandline tool does not support external reporters.

![screenshot](screenshot.png)

## Install

Install with [npm](https://npmjs.org/package/coffeelint-stylish): `npm install --save-dev coffeelint-stylish`.

## Usage with CoffeeLint runtime

```coffeescript
coffeelint = require 'coffeelint'
reporter = require('coffeelint-stylish').reporter

filename = 'make.coffee'
source = 'do -> coffee()'

reporter filename, coffeelint source
```

## Options `reporter(filename, results)`

### filename 
Type: `String`, Default: `''`

Headline of the report.

### results 
Type: `Array`, Default: `[]`

Results `Array` provided by `coffeelint.lint`, see http://www.coffeelint.org/#api.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © [Jan Raasch](http://janraasch.com)

[npm-url]: https://npmjs.org/package/coffeelint-stylish
[npm-image]: https://badge.fury.io/js/coffeelint-stylish.png

[travis-url]: http://travis-ci.org/janraasch/coffeelint-stylish
[travis-image]: https://secure.travis-ci.org/janraasch/coffeelint-stylish.png?branch=master

[depstat-url]: https://david-dm.org/janraasch/coffeelint-stylish
[depstat-image]: https://david-dm.org/janraasch/coffeelint-stylish.png

[devdepstat-url]: https://david-dm.org/janraasch/coffeelint-stylish#info=devDependencies
[devdepstat-image]: https://david-dm.org/janraasch/coffeelint-stylish/dev-status.png
