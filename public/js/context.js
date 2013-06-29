

mentat.forge.createContext = function () {

	var context = {};
	_(context).extend(_.clone(Backbone.Events));

	var history = [{
		connections: 0,
		mentalState: 0
	}];

	/*----------------------------------*/

	Object.defineProperty(context, 'latestRecord', {
		get: function () { return latestRecord(); }
	});

	Object.defineProperty(context, 'connections', {
		get: function () { return latestRecord().connections; }
	});

	Object.defineProperty(context, 'mentalState', {
		get: function () { return latestRecord().mentalState; }
	});

	Object.defineProperty(context, 'mentalStateCounts', {
		get: function () { return latestRecord().mentalStateCounts; }
	});

	/*----------------------------------*/

	function latestRecord() {
		return _(history).last();
	}

	/*----------------------------------*/

	context.update = function (newContext) {
		var defaultedContext = _(newContext).defaults(latestRecord());
		history.push(newContext);
	}

	return context;
}