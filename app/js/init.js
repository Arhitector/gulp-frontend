define(function(require, exports, module) {
	require('marionette');
	
	var fakeServer = require('fakeServer');

	/* Set default template engine */
	Marionette.Renderer.render = function(template, data) {
		if ( _.isFunction(template) ) template = template();
		template = Handlebars.compile(template);
		return template(data);
	};

	/* Start fake server */
	if (fakeServer && fakeServer.start) fakeServer.start();

	/* Start modules */
	require('testModule').start();

	Backbone.history.start();
});
