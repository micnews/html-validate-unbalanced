
# html-validate-unbalanced

  Spot unbalanced tag pairs

## Example

```js
var validate = require('html-validate-unbalanced');

process.stdin
  .pipe(validate())
  .on('error', AAAAHA)
  .pipe(process.stdout);
```

## Installation

```bash
$ npm install html-validate-unbalanced
```

## License

  MIT

