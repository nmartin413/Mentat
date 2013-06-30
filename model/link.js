

exports.create = function (socket) {
	var link = {};

	var socket = link.socket = socket;
	var state = link.state = {
		mentalState: 0
	};

	Object.defineProperty(link, 'preview', {
		get: function () {
			var atts = {
				state: state
			};
			return JSON.stringify(atts);
		}
	})

	return link;
}