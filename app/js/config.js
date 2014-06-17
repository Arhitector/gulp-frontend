require.config({
	baseUrl			: '/js',
	waitSeconds		: 60,
	deps			: ['init'],
	/**
	 * Log path to file
	 */
	paths : {
		/**
		 * JS helpers file (like request, fake server)
		 */
		init				: 'init',
		utils				: 'share/utils/utils',
		fakeServer			: 'share/server/server',
		fakeRequests		: 'share/server/serverRequests',
		/**
		 * JS libs
		 */
		jquery				: 'lib/jquery/dist/jquery.min',
		backbone			: 'lib/backbone/backbone',
		marionette			: 'lib/marionette/lib/backbone.marionette',
		underscore			: 'lib/underscore/underscore',
		sinonjs				: 'lib/sinonjs/sinon',
		chai				: 'lib/chai/chai',
		handlebars			: 'lib/handlebars/handlebars',
		text				: 'lib/text/text'
	},
	packages : [
		{
			name		: 'testModule',
			location	: 'modules/module-test'
		}
	],
	/**
	 * Global options
	 */
	config : {
		//Module name
		fakeServer : {
			autoRespondAfter : 2000
		}
	},
	/**
	 * Dependencies
	 */
	shim : {
		underscore : {
			exports : '_'
		},
		backbone : {
			deps	: ['underscore', 'jquery', 'handlebars'],
			exports	: 'Backbone'
		},
		marionette : {
			deps	: ['backbone'],
			exports : 'Marionette'
		},
		fakeServer : {
			deps : ['sinonjs']
		}
	}
});