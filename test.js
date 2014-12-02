var validate = require('./');
var test = require('tape');
var concat = require('concat-stream');

test('unbalanced', function(t){
  t.plan(1);
  var html = '<div><span>foo<span></div>';
  var v = validate();
  v.on('data', function(){});
  v.on('error', function(err){
    t.equal(err.message, 'unmatched <span>, <span> before </div>')
  });
  v.end(html);
});

test('balanced', function(t){
  t.plan(1);
  var html = '<div><span>foo</span></div>';
  var v = validate();
  v.pipe(concat(function(out){
    t.equal(out.toString(), html);
  }));
  v.end(html);
});
