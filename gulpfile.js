'use strict';


//импортируем нужные плагины
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    spritesmith = require('gulp.spritesmith'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    opn = require('opn');


//переменная с путями
var path = {
    build: { //Тут готовые после сборки файлы
        html: 'build/',
        js: 'build/common/js/',
        css: 'build/common/css/',
        img: 'build/common/img/',
        svg: 'build/common/img/svg/',
        fonts: 'build/common/fonts/'
    },
    src: { //Пути откуда брать исходники
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
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
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


//переменная с настройками сервера
var server = {
    host: 'localhost',
    port: '9000'
};


//задача по сборке html
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(livereload());
});


//задача по сборке jade
gulp.task('jade:build', function () {
    gulp.src(path.src.jade)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(livereload());
});


//задача по сборке спрайтов
gulp.task('sprite:build', function() {
    var spriteData =
        gulp.src(path.src.sprites)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.styl',
                cssFormat: 'stylus',
                algorithm: 'binary-tree',
                padding: 2,
                cssTemplate: 'stylus.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest(path.build.img));
    spriteData.css.pipe(gulp.dest(path.src.stylesprite));
});


//задача по сборке своих js
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(livereload());
});


//задача по сборке своих стилей
gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(stylus({
            'include css': true
        }))
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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(livereload());
});


//задача по сборке картинок
gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(pngquant({ quality: '65-80', speed: 4 })())
        .pipe(gulp.dest(path.build.img))
        .pipe(livereload());
});


//задача по сборке svg
gulp.task('svg:build', function () {
    gulp.src(path.src.svg)
        .pipe(gulp.dest(path.build.svg))
        .pipe(livereload());
});


//задача по сборке шрифтов
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(livereload());
});


// задача build
gulp.task('build', [
    'html:build',
    'jade:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'svg:build',
    'sprite:build'
]);


//наблюдаем за изменением файлов
gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.jade, ['jade:build']);
    gulp.watch(path.watch.style, ['style:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.img, ['image:build']);
    gulp.watch(path.watch.svg, ['svg:build']);
    gulp.watch(path.watch.sprites, ['sprite:build']);
    gulp.watch(path.watch.fonts, ['fonts:build']);
});


//поднимаем вебсервер и livereload
gulp.task('webserver', function() {
    connect.server({
        host: server.host,
        port: server.port,
        livereload: true
    });
});


//задача по чистке build
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


//открываем браузер
gulp.task('openbrowser', function() {
    opn( 'http://' + server.host + ':' + server.port + '/build/' );
});


//дефолтная задача по запуску всех задача
gulp.task('default', ['build', 'watch', 'webserver', 'openbrowser']);