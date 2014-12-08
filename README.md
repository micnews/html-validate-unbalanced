
# html-validate-unbalanced

  Spot unbalanced tag pairs, like

```html
<div><span>foo<span></div>
```

  [![build status](https://secure.travis-ci.org/micnews/html-validate-unbalanced.svg)](http://travis-ci.org/micnews/html-validate-unbalanced)

## Stability

  This module is undergoing heavy testing and is likely to be broken. Please open issues with the exact html for which it misbehaved.

## Example

```js
var validate = require('html-validate-unbalanced');

process.stdin
  .pipe(validate())
  .on('warning', AAAAHA)
  .pipe(process.stdout);
```

## Installation

```bash
$ npm install html-validate-unbalanced
```

## License

  MIT

