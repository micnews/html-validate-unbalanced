var validate = require('./');
var test = require('tape');
var concat = require('concat-stream');

test('unbalanced', function(t){
  t.plan(2);
  var html = '<div><span>foo<span></div>';
  var v = validate();
  v.pipe(concat(function(out){
    t.equal(out.toString(), html);
  }));
  v.on('warning', function(err){
    t.equal(err.message, 'unmatched <span>, <span> before </div>')
  });
  v.end(html);
});

test('balanced', function(t){
  t.plan(1);
  var html = '<div><span>foo</span></div>';
  var v = validate();
  v.on('warning', function(err){
    t.error(err);
  });
  v.pipe(concat(function(out){
    t.equal(out.toString(), html);
  }));
  v.end(html);
});

test('comment', function(t){
  t.plan(1);
  var html = '<!-- hey --><span>foo</span>';
  var v = validate();
  v.on('warning', function(err){
    t.error(err);
  });
  v.pipe(concat(function(out){
    t.equal(out.toString(), html);
  }));
  v.end(html);
});

test('self closing', function(t){
  t.plan(1);
  var html = '<input><span>foo</span>';
  var v = validate();
  v.on('warning', function(err){
    t.error(err);
  });
  v.pipe(concat(function(out){
    t.equal(out.toString(), html);
  }));
  v.end(html);
});

test('doctype', function(t){
  t.plan(1);
  var html = '<!DOCTYPE html><span>foo</span>';
  var v = validate();
  v.on('warning', function(err){
    t.error(err);
  });
  v.pipe(concat(function(out){
    t.equal(out.toString(), html);
  }));
  v.end(html);
});

test('flush', function(t){
  t.plan(2);
  var html = '<span>';
  var v = validate();
  v.on('warning', function(err){
    t.equal(err.message, 'unmatched <span>');
  });
  v.pipe(concat(function(out){
    t.equal(out.toString(), html);
  }));
  v.end(html);
});

test('warn once', function(t){
  t.plan(2);
  var html = '<span></div><strong></table>';
  var v = validate();
  v.on('warning', function(err){
    t.equal(err.message, 'unmatched <span> before </div>');
  });
  v.pipe(concat(function(out){
    t.equal(out.toString(), html);
  }));
  v.end(html);
});

test('ignore attributes', function(t){
  t.plan(1);
  var html = '<html class="class" id="id"></html>';
  var v = validate();
  v.on('warning', function(err){
    t.error(err);
  });
  v.pipe(concat(function(out){
    t.equal(out.toString(), html);
  }));
  v.end(html);
});

