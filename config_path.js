const path = {
	build: {
        html: './build/',
		css: './build/common/css/',
		js: './build/common/js/',
		img: './build/common/img/',
		svg: './build/common/img/svg/',
		svg_font: './build/common/fonts/iconfont/',
		fonts: './build/common/fonts/',
		data: './tmp/'
	},
	src: {
        jade: './src/*.jade',
        html: './src/*.html',
        js: './src/js/*.js',
        styleStylus: './src/css/main.styl',
		styleStylusVendor: './src/css/vendor.styl',
		img: './src/img/*.*',
		svg: './src/img/svg/*.svg',
		svg_icons: './src/img/svg_icons/*.svg',
		svg_css_tpl: './tmp/iconfont_tpl.css',
		svg_css: '../../../../tmp/iconfont.css',
		fonts: './src/fonts/**/*.*',
		data: './src/blocks/**/data.js'
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
	zip: {
		src: './build/**/*.*',
		dest: './archives/'
	},
	watch: {
		jade: './src/**/*.jade',
		js: './src/js/*.js',
        html: './src/*.html',
		styleStylus: 'src/**/*.{styl, css}',
		img: 'src/img/*.*',
		svg_icons: './src/img/svg_icons/*.svg',
		svg: 'src/img/svg/*.svg',
		fonts: 'src/fonts/**/*.*',
		server: 'build/**/*.*',
		data: './src/blocks/**/data.js'
	},
	server: {
		dest: 'build/'
	},
	clean: './build',
	ssh: {
		host: '188.166.6.60',
		user: 'root',
		pass: null,
		remotePath: '/var/www/static/',
		src: './build/**/*.*'
	}
};

module.exports = path;