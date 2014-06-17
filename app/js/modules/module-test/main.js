/**
 * Module require initialize param (Function for module start);
 */
define(function(require, exports, module) {
	var Router = require('./router'),
		View = require('./view');

	exports.start = function() {
		new Router({
			controller : {
				routerTest : function() {
					console.log('Router work');
				}
			}
		});

		new View().render().$el.appendTo('body');
		console.log('Test module loaded');
	};
});