'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');


module.exports = function (options) {
	return function() {
	    return gulp.src(options.src)
	    	.pipe($.newer(options.dest))
	    	.pipe($.jade({
	            pretty: true
	        }))
	        .pipe(gulp.dest(options.dest));
	};
};