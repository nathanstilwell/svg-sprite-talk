/*jshint esnext: true, laxcomma: true, eqeqeq: true, bitwise: true, curly: true, latedef: true, strict: true, plusplus: true*/
/*global require, process*/

'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var env = process.env.NODE_ENV || 'development';
var reporter;

if ('development' === env) {
  reporter = 'nyan';
}

if ('test' === env) {
  reporter = 'list';
}

gulp.task('run-tests', function () {
  gulp.src('test/**/*.js', {read: false})
    .pipe(mocha({reporter: reporter}));
});
