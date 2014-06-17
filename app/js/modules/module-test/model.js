define(function(require, exports, module) {
	require('marionette');
	
	return Backbone.Model.extend({
		url : '/test',
		defaults : {
			hello : 'Hello World'
		}
	});
});