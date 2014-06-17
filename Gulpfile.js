var gulp		= require('gulp'),
	less		= require('gulp-less-sourcemap'),
	sass		= require('gulp-ruby-sass'),
	clean		= require('gulp-rimraf'),
	jade		= require('gulp-jade'),
	sprite		= require('gulp.spritesmith'),
	imagemin	= require('gulp-imagemin'),
	karma		= require('karma').server,
	requirejs	= require('requirejs'),
	rename		= require('gulp-rename'),
	connect		= require('gulp-connect'),
	CSSBuilder	= 'less', //less, sass
	loc = {
		root		: 'app',
		build		: 'build',
		markup		: 'app/markup',
		jade		: 'app/jade',
		js			: 'app/js',
		css			: 'app/css',
		less		: 'app/css/less',
		sass		: 'app/css/sass',
		images		: 'app/images',

		/* JS */
		requireConfigName	: 'config',
		requireInitName		: 'init',
		requireConfig		: 'app/js/config.js',
		minJs				: 'app/js/main.min.js',
		mapJs				: 'app/js/main.min.js.map',

		/* CSS */
		allCssMinName	: 'all.min',
		sourceMapURL	: '../css/all.min.css.map',
		lessAll			: 'app/css/less/all.less',
		sassAll			: 'app/css/sass/all.scss',

		/* Images */
		imageMin	: 'build/images',

		/* Tests */
		karmaConfig	: __dirname + '/test/karma.conf.js'
	},
	jadeData = {
		isDev : true
	};

gulp.task('js', function() {
	return requirejs.optimize({
			baseUrl					: loc.js,												//	location of all the compiled js files
			mainConfigFile			: loc.requireConfig,									//	configuration of Require.js
			include					: [loc.requireConfigName],								//	the name of your require.js config file, this makes sure you include the require.js files as well
			name					: loc.requireInitName,									//	main file for application start
			out						: loc.minJs,											//	the production ready javascript file: the result
			preserveLicenseComments	: false,												//	remove comments from build file
			optimize				: 'uglify2',											//	use this options to generate js map for simplify js debuging
			generateSourceMaps		: true,													//	use this options to generate js map for simplify js debuging
			stubModules				: ['text', 'sinonjs', 'fakeServer', 'fakeRequests']		//	remove this modules on build
		});
});

gulp.task('jsReload', function () {
	return gulp
			.src([
				'Gulpfile.js',
				loc.js + '/**/*.js',
				loc.js + '/**/*.html',
				'!' + loc.minJs,
				'!' + loc.js + '/lib/**/*'
			])
			.pipe(connect.reload());
});

gulp.task('less', function () {
	return gulp
			.src(loc.lessAll)
			.pipe(rename({
				basename	: loc.allCssMinName,
				extname		: '.css'
			}))
			.pipe(less({
				sourceMap			: true,
				compress			: true,
				sourceMapURL		: loc.sourceMapURL,
				sourceMapBasepath	: loc.less
			}))
			.pipe(gulp.dest(loc.css))
			.pipe(connect.reload());
});

gulp.task('sass', function () {
	return gulp.src(loc.sassAll)
			.pipe(rename({
				basename	: loc.allCssMinName,
				extname		: '.css'
			}))
			.pipe(sass({
				sourcemap	: loc.css + '/' + loc.allCssMinName + '.css.map',
				style		: 'compressed'
			}))
			.pipe(gulp.dest(loc.css))
			.pipe(connect.reload());
});

gulp.task('jade', function() {
	gulp.src(loc.jade + '/*.jade')
		.pipe(jade({
			locals	: jadeData,
			pretty	: true
		}))
		.pipe(gulp.dest(loc.markup))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(loc.less + '/**/*.less', ['less']);
	gulp.watch(loc.sass + '/**/*.scss', ['sass']);
	gulp.watch(loc.jade + '/**/*.jade', ['jade']);
	gulp.watch([
		'Gulpfile.js',
		loc.js + '/**/*.js',
		loc.js + '/**/*.html',
		'!' + loc.minJs,
		'!' + loc.js + '/lib/**/*'
	], ['jsReload']);
});

gulp.task('connect', function() {
	connect.server({
		root		: loc.root,
		livereload	: true
	});
});

gulp.task('clean', function(cb) {
	return gulp
			.src([
				loc.minJs,
				loc.mapJs,
				loc.build,
				loc.markup,
				loc.css + '/' + loc.allCssMinName + '.css',
				loc.css + '/' + loc.allCssMinName + '.css.map',
				loc.js + '/lib',
				'./node_modules',
				'npm-debug.log',
			], {read : false})
			.pipe(clean({force : true}));
});

gulp.task('test', function (done) {
	karma.start({
		configFile : loc.karmaConfig
	}, done);
});

gulp.task('copy', function() {
	gulp
		.src(loc.markup + '/*')
		.pipe(gulp.dest(loc.build + '/markup'));

	gulp
		.src(loc.images + '/*')
		.pipe(gulp.dest(loc.build + '/images'));

	gulp
		.src([
			loc.minJs,
			loc.mapJs
		])
		.pipe(gulp.dest(loc.build + '/js'));

	gulp
		.src(loc.js + '/lib/requirejs/require.js')
		.pipe(gulp.dest(loc.build + '/js/lib/requirejs/'));

	gulp
		.src([
			loc.css + '/' + loc.allCssMinName + '.css',
			loc.css + '/' + loc.allCssMinName + '.css.map'
		])
		.pipe(gulp.dest(loc.build + '/css'));
});

gulp.task('default', ['jade', CSSBuilder, 'js', 'connect', 'watch']);
gulp.task('build', ['jade', CSSBuilder, 'js', 'copy']);

