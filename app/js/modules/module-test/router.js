define(function(require, exports, module) {
	require('marionette');
	
	var Router = Marionette.AppRouter.extend({
		appRoutes : {
			'module-test' : 'routerTest'
		}
	});

	return Router;
});