var validate = require('./');
var noop = function(){};

var v = validate();
v.on('data', noop);
v.on('warning', console.error);
v.end('<div><span>foo<span></div>');
