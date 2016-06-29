/*
 * gulp-confirm
 * https://github.com/anseki/gulp-confirm
 *
 * Copyright (c) 2015 anseki
 * Licensed under the MIT license.
 */

'use strict';

var gutil = require('gulp-util'),
  through = require('through2'),
  readlineSync = require('readline-sync'),
  RE_CTRL_CHAR = /\x1B\[\d+m/,
  HL_IN = '\x1B[1m', HL_OUT = '\x1B[22m';

// Wrap handler
function callHandler(handler, argsArray) {
  try {
    return {val: handler.apply(null, argsArray)};
  } catch (e) {
    return {err: e};
  }
}

function hl(text) {
  return !(text += '') || RE_CTRL_CHAR.test(text) ? text : HL_IN + text + HL_OUT;
}

function Confirm(options) {
  var that = this;
  that.options = options;
  that.stream = through.obj(function() { that.transform.apply(that, arguments); });
}

Confirm.prototype.transform = function(file, encoding, callback) {
  var options = this.options, query, matches,
    res, rlsMethod, rlsOptions = {history: false};

  if (typeof this.proceed !== 'boolean') {

    if (typeof options.question === 'function') {
      res = callHandler(options.question);
      if (res.err) {
        console.error('"question" failed.');
        return callback(new gutil.PluginError('gulp-confirm', res.err));
      }
      if (!res.val) {
        this.proceed = true;
        callback(null, file); // Do nothing.
        return;
      }
      query = res.val;
    } else {
      query = options.question ?
        options.question + ' :' : options.question; // accept ''
    }

    if ((matches = /^\s*_key(?:\:(.+))?\s*$/i.exec(options.input + ''))) {
      rlsMethod = 'keyIn';
      if (matches[1]) { rlsOptions.trueValue = matches[1]; }
      else if (typeof options.proceed !== 'function' &&
        typeof options.proceed !== 'boolean') { rlsMethod = 'keyInPause'; }
    } else {
      rlsMethod = 'question';
      if (options.input) { rlsOptions.trueValue = (options.input + '').split(','); }
    }

    if (process.platform === 'win32' && process.stdin.isTTY) {
      // init force
      try {
        require('fs').writeSync(process.stdin.fd, ''); // not stdout
      } catch (e) {}
    }
    res = readlineSync[rlsMethod](query && process.platform !== 'win32' ?
      hl(query) : query, rlsOptions); // accept undefined
    if (rlsOptions.trueValue) {
      this.proceed = res === true;
    } else if (typeof options.proceed === 'function') {
      res = callHandler(options.proceed, [res]);
      if (res.err) {
        console.error('"proceed" failed.');
        return callback(new gutil.PluginError('gulp-confirm', res.err));
      }
      this.proceed = !!res.val;
    } else {
      this.proceed = typeof options.proceed === 'boolean' ? options.proceed : true;
    }
    if (!this.proceed) { gutil.log(hl('Tasks are aborted.')); }

  }
  callback(null, this.proceed ? file : null);
};

module.exports = function(options) { return (new Confirm(options)).stream; };
