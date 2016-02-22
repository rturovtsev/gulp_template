'use strict'

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');


module.exports = function (options) {
	return function() {
		return gulp.src(options.src, {since: gulp.lastRun('svg')})
			.pipe($.newer(options.dest))
			.pipe(gulp.dest(options.dest));		
	};
};