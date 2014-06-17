define(function(require, exports, module) {
	exports.start = function() {
		var server = sinon.fakeServer.create(),
			buildSinonResponse = function(content, status) {
				if (status === null) {
					status = 200;
				}
				return [ status, { 'Content-Type': 'application/json'}, content ];
			},
			_fn = function(req) {
				var response;
				if (_.isFunction(req.response)) {
					response = req.response;
				} else {
					response = buildSinonResponse(req.response);
				}
				return server.respondWith(req.method, req.route, response);
			},
			requests = require('fakeRequests');

		server.autoRespond = true;
		server.autoRespondAfter = module.config().autoRespondAfter || 2000;

		for (var n = 0, max = requests.length; n < max; n++) {
			//Check if json
			if (_.isObject(requests[n].response)) {
				requests[n].response = JSON.stringify(requests[n].response);
			}
			_fn(requests[n]);
		}
	};
});