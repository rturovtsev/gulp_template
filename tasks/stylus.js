'use strict'

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const multipipe = require('multipipe');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function (options) {
	return function () {
		return multipipe(
			gulp.src(options.src, {since: gulp.lastRun('stylus')}),
			$.if(isDevelopment, $.sourcemaps.init()),
			$.stylus({
				'include css': true
			}),
			$.if(isDevelopment, $.sourcemaps.write()),
			gulp.dest(options.dest)
		).on('error', $.notify.onError());
	};
};