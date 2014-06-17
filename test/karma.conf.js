module.exports = function(config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '../',

		// frameworks to use
		frameworks: ['mocha', 'requirejs'],

		// list of files / patterns to load in the browser
		files: [
			'app/js/config.js',
			'test/test-config.js',

			{ pattern: 'app/js/**/*.js', included: false, served: true, watched: true },
			{ pattern: 'app/js/**/*.html', included: false, served: true, watched: true },
			{ pattern: 'test/spec/**/*.js', included: false, served: true, watched: true }
		],

		// list of files to exclude
		exclude: [
			'js/init.js',
			'js/main.min.js',
			'js/main.min.js.map',
			'js/lib/jasmine-sinon/**/*',
			'js/lib/jasmine/**/*'
		],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['Chrome'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
	});
};
