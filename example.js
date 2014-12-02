var validate = require('./');
var noop = function(){};

var v = validate();
v.on('data', noop);
v.end('<div><span>foo<span></div>');
