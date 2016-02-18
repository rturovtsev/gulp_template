'use strict';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');

const path = {
	build: { //готовые файлы
		html: 'build/',
		js: 'build/common/js/',
		css: 'build/common/css/',
		img: 'build/common/img/',
		svg: 'build/common/img/svg/',
		fonts: 'build/common/fonts/'
	},
	src: { //исходники
		html: 'src/*.html',
		jade: 'src/*.jade',
		js: 'src/js/*.js',
		style: 'src/css/style.styl',
		stylesprite: 'src/css/',
		img: 'src/img/*.*',
		svg: 'src/img/svg/*.svg',
		fonts: 'src/fonts/**/*.*',
		sprites: 'src/img/sprites/*.*'
	},
	watch: { //где следим
		html: 'src/**/*.html',
		jade: 'src/**/*.jade',
		js: 'src/js/**/*.js',
		style: 'src/**/*.styl',
		img: 'src/img/*.*',
		svg: 'src/img/svg/*.svg',
		fonts: 'src/fonts/**/*.*',
		sprites: 'src/img/sprites/*.*'
	},
	clean: './build'
};


gulp.task('stylus', function() {
	return gulp.src(path.src.style, {since: fulp.lastRun('stylus')})
		.pipe(autoprefixer({
            browsers: [
                '> 1%',
                'last 2 versions',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'
                ]
        }))
		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(stylus({
			'include css': true
		}))
		.pipe(gulpIf(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest(path.dest.css));
});


gulp.task('svg', function () {
	return gulp.src(path.src.svg, {since: fulp.lastRun('svg')})
		.pipe(gulp.dest(path.build.svg));
});


gulp.task('fonts', function() {
	return gulp.src(path.src.fonts, {since: fulp.lastRun('fonts')})
		.pipe(gulp.dest(path.build.fonts));
});


gulp.task('del', function() {
	return del(path.clean);
});


gulp.task('watch', function() {
	gulp.watch(path.watch.style, gulp.series('stylus'));
	gulp.watch(path.watch.svg, gulp.series('svg'));
	gulp.watch(path.watch.fonts, gulp.series('fonts'));
});


gulp.task('build', gulp.series('del', gulp.series('stylus', 'svg', 'fonts'));

gulp.task('dev', gulp.series('del', gulp.series('build', 'watch'));