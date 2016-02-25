const path = {
	build: {
        html: './build/',
		css: './build/common/css/',
		js: './build/common/js/',
		img: './build/common/img/',
		svg: './build/common/img/svg/',
		fonts: './build/common/fonts/'
	},
	src: {
        jade: './src/*.jade',
        html: './src/*.html',
        js: './src/js/*.js',
        styleStylus: './src/css/main.styl',
		styleStylusVendor: './src/css/vendor.styl',
		img: './src/img/*.*',
		svg: './src/img/svg/*.svg',
		fonts: './src/fonts/**/*.*'
	},
	assets: {
		js: {
			src: ['./src/vendor/bower_components/jquery/dist/jquery.min.js'],
			dest: './build/common/js/'
		},
		fonts: {
			src: ['./src/vendor/bower_components/bootstrap/dist/fonts/*.*'],
			dest: './build/common/fonts/'
		}
	},
	watch: {
		jade: './src/**/*.jade',
		js: './src/js/*.js',
        html: './src/*.html',
		styleStylus: 'src/**/*.styl',
		img: 'src/img/*.*',
		svg: 'src/img/svg/*.svg',
		fonts: 'src/fonts/**/*.*',
		server: 'build/**/*.*'
	},
	server: {
		dest: 'build/'
	},
	clean: './build'
};

module.exports = path;