'use strict'

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const multipipe = require('multipipe');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function (options) {
	return function () {
		return multipipe(
			gulp.src([options.src, options.vend], {since: gulp.lastRun(options.taskName)}),
			$.if(isDevelopment && 'main.styl', $.sourcemaps.init()),
			$.stylus({
				'include css': true
			}),
			$.if(isDevelopment && 'main.styl', $.autoprefixer({
	            browsers: [
	                '> 1%',
	                'last 2 versions',
	                'IE 8',
	                'IE 9',
	                'IE 10',
	                'IE 11'
	                ]
	        })),
			$.if(isDevelopment && 'main.css', $.sourcemaps.write()),
			gulp.dest(options.dest)
		).on('error', $.notify.onError());
	};
};