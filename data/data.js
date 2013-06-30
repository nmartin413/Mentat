var fs = require('fs');

var mentalStates = [];

Object.defineProperty(exports, 'mentalStates', {
	get: function () { return mentalStates; }
});

// Load Mental States from JSON
(function () {
	var path = __dirname + '/mentalStates.json';
	console.log('Loading mental states from ' + path);
	fs.readFile(path, 'utf8', function (err, data) {

		if (err) {
			console.log('Error: ' + err);
			return;
		}

		mentalStates = JSON.parse(data);

		console.log('Mental States Loaded:');
		console.log(data);

	});
}());

exports.createMentalStateCountMap = function () {
	var map = {};
	mentalStates.forEach(function (mentalState) {
		map[mentalState.name] = 0;
	});
	return map;
}


Object.defineProperty(exports, 'initData', {
	get: function () {
		return {
			mentalStates: mentalStates
		};
	}
});