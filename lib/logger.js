/*global module, process, require */

'use strict';

module.exports = function photocracyLogger (key) {

  //
  //  In our development environment, NODE_ENV is set
  //  by nodemon in the gulp setup. If someone just ran
  //  the server in a vacuum, I will assume they are in
  //  development mode.
  //
  //  In our production environment, NODE_ENV should be set
  //  by the Dockerfile and our development dependencies will
  //  not be present.
  //
  var env = process.env.NODE_ENV || 'development';

  if ('development' === env) {
    var debug = require('debug')(key);
    var RainbowBarf = require('rainbow-barf');
    var barf = new RainbowBarf(debug);

    return barf;
  }

  if ('production' === env) {
    return function noop () {};
  }

}; // exports