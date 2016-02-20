'use strict';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const multipipe = require('multipipe');

const path = {
	build: { //готовые файлы
		build: 'html/',
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
		sprites: 'src/img/sprites/*.*',
		server: 'build/**/*.*'
	},
	server: {
		dest: 'build/'
	}
	clean: './build'
};


gulp.task('stylus', function() {
	return multipipe(
		gulp.src(path.src.style, {since: gulp.lastRun('stylus')}),
		gulpIf(isDevelopment, sourcemaps.init()),
		stylus({
			'include css': true
		}),
		gulpIf(isDevelopment, sourcemaps.write()),
		gulp.dest(path.dest.css)
	).on('error', notify.onError());
});


gulp.task('svg', function () {
	return gulp.src(path.src.svg, {since: gulp.lastRun('svg')})
		.pipe(newer(path.build.svg))
		.pipe(gulp.dest(path.build.svg));
});


gulp.task('fonts', function() {
	return gulp.src(path.src.fonts, {since: gulp.lastRun('fonts')})
		.pipe(newer(path.build.fonts))
		.pipe(gulp.dest(path.build.fonts));
});


gulp.task('img', function () {
    return gulp.src(path.src.img, {since: gulp.lastRun('img')})
    	.pipe(newer(path.build.img))
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img));
});


gulp.task('del', function() {
	return del(path.clean);
});


gulp.task('serve', function() {
	browserSync.init({
		server: path.server.dest
	});

	browserSync.watch(path.watch.server).on('change', browserSync.reload);
});


gulp.task('watch', function() {
	gulp.watch(path.watch.style, gulp.series('stylus'));
	gulp.watch(path.watch.svg, gulp.series('svg'));
	gulp.watch(path.watch.fonts, gulp.series('fonts'));
	gulp.watch(path.watch.img, gulp.series('img'));
});


gulp.task('build', gulp.series('del', gulp.parallel('stylus', 'svg', 'fonts', 'img'));

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));