define(function(require, exports, module) {
	var moduleTestTemplate = require('text!./templates/module-test.html'),
		Model = require('./model');

	return Marionette.ItemView.extend({
		tagName : 'h1',
		template : moduleTestTemplate,
		model : new Model(),
		events : {
			click : function(e) {
				this.model.save();
			}
		},
		modelEvents : {
			sync : function(res) {
				console.log(res.toJSON());
			}
		}
	});
});