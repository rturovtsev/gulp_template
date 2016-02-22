'use strict';

const gulp = require('gulp');

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
	},
	clean: './build'
};


function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);

        return task(callback);
    });
}


lazyRequireTask('stylus', './tasks/stylus.js', {
    src: path.src.style,
    dest: path.build.css
});


lazyRequireTask('svg', './tasks/svg.js', {
    src: path.src.svg,
    dest: path.build.svg
});


lazyRequireTask('fonts', './tasks/fonts.js', {
    src: path.src.fonts,
    dest: path.build.fonts
});


lazyRequireTask('img', './tasks/img.js', {
    src: path.src.fonts,
    dest: path.build.fonts
});


lazyRequireTask('del', './tasks/del.js', {
    dest: path.clean
});


lazyRequireTask('serve', './tasks/serve.js', {
    dest: path.server.dest,
    watch: path.watch.server
});


gulp.task('watch', function() {
	gulp.watch(path.watch.style, gulp.series('stylus'));
	gulp.watch(path.watch.svg, gulp.series('svg'));
	gulp.watch(path.watch.fonts, gulp.series('fonts'));
	gulp.watch(path.watch.img, gulp.series('img'));
});


gulp.task('build', gulp.series('del', gulp.parallel('stylus', 'svg', 'fonts', 'img')));

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));