var tokenize = require('html-tokenize');
var through = require('through2');
var duplex = require('duplexer2');
var selfClosing = require('./lib/self-closing');

module.exports = function(){
  var stack = [];
  var tok = tokenize();
  var warned = false;
  var tr = through.obj(function(row, enc, done){
    this.push(row[1]);
    if (warned) return done();

    var open = row[0] == 'open';
    var close = row[0] == 'close';
    if (!open && !close) return done();

    // ignore comments
    if (/(^<!|-->$)/.test(row[1].toString())) return done();

    var tag = row[1].toString()
      .replace(/^<\/?/, '')
      .replace(/>$/, '')
      .replace(/ .+$/, '');
    if (selfClosing(tag)) return done();

    // for each tag, ensure tags opened after it are closed before it is closed

    if (open) {
      stack.push(tag);
    } else {
      if (stack[stack.length - 1] == tag) {
        stack.pop();
      } else {
        var unmatched = [];
        for (var i = stack.length - 1; i >= 0; i--) {
          if (stack[i] != tag) unmatched.push('<' + stack[i] + '>');
        }

        warned = true;
        var warning = new Error('unmatched ' + unmatched.join(', ')
            + ' before </' + tag + '>');
        dup.emit('warning', warning);
      } 
    }

    done();
  }, function(done){
    if (!stack.length || warned) return done();
    var unmatched = stack.map(function(tag){
      return '<' + tag + '>';
    });
    var warning = new Error('unmatched ' + unmatched.join(', '));
    dup.emit('warning', warning);
    done();
  });
  tok.pipe(tr);
  var dup = duplex(tok, tr);
  return dup;
};

