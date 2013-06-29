

var mentat = {
	
	forge: {},

	mentalStateNames: {
		"0": "Following",
		"1": "Confused",
		"2": "Lost"
	}

};


(function (forge) {

	var socket;
	var context;

	var connectionView;
	var stateSelection;
	var mentalOverview;

	/*----------------------------------*/

	Object.defineProperty(mentat, 'context', {
		get: function () { return context; }
	});

	/*----------------------------------*/

	function didInitSocket() {
		console.log('Socket Initialized');
	}

	function didUpdateContext(newContext) {
		context.update(newContext);
		console.log('Context updated \n\t', newContext);
		updateViewsFromContext();
	}

	function didChangeMentalState(value) {
		context.update({ mentalState: value });
		notifyStateChange();
	}

	function updateViewsFromContext() {
		connectionView.displayCount = context.connections;
		stateSelection.currentState = context.mentalState;
		mentalOverview.totalCount = context.connections;
		mentalOverview.counts = context.mentalStateCounts;
	}

	function notifyStateChange() {
		var currentState = getCurrentState();
		socket.emit('didUpdateState', currentState);
	}

	function getCurrentState() {
		return {
			mentalState: context.mentalState
		};
	}

	/*----------------------------------*/

	mentat.init = function (opts) {
		context = forge.createContext();

		connectionView = forge.createConnectionView();
		connectionView.bind(opts.connectionViewElement);

		stateSelection = forge.createStateSelection();
		stateSelection.bind(opts.stateSelectionElement);
		stateSelection.on('didChangeMentalState', didChangeMentalState);

		mentalOverview = forge.createMentalOverview();
		mentalOverview.bind(opts.overviewElement);

	}

	mentat.start = function () {
		socket = io.connect(location.origin);
		socket.on('init', didInitSocket);
		socket.on('didUpdateContext', _(didUpdateContext).debounce(500));
	}


}(mentat.forge));