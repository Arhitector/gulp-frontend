define(function(require, exports, module) {
	require('backbone');
	require('handlebars');

	return {
		navigate : function(route, options) {
			options = options || {};
			Backbone.history.navigate(route, options);
		},
		getCurrentRoute : function() {
			return Backbone.history.fragment;
		},
		/**
		 * Create html template for js usage. (Using Handlebars js templating)
		 * @param {String} source HTML string for Handlebars
		 * @param {Object} data Data for html string
		 * @returns {String} HTML string ready for insertion
		 */
		createTpl : function(source, data) {
			if (!Handlebars) throw new Error('Handlebars library require');
			var template = Handlebars.compile(source);

			return template(data);
		},
		/**
		 * Fromat number into 1 000 000 000 this format
		 * @param {String|Number} str
		 */
		formatInt : function(str) {
			if (typeof str !== 'string') str = '' + str;
			
			return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		},
		/**
		 * Append throbber element to any DOM element
		 * @param {Object} config
		 * @returns {Function} Remove throbber
		 * @returns {String} If there is no appendTo param in config
		 */
		setThrobber : function(config) {
			var tpl = require('text!helpers/templates/throbber.html'),
				$throbElem;

			config = $.extend({
				w			: 16,			//width
				h			: 16,			//height
				color		: '#147eb9',	//color
				className	: ''			//editional class
			}, config);
			tpl = this.createTpl(tpl, config);

			if (!config.appendTo) return tpl;
			$throbElem =  $(tpl).appendTo(config.appendTo);

			return function() {
				$throbElem.remove();
			};
		},
		errorHandler : function(error) {
			alert(error || 'Error occured');
		}
	};
});