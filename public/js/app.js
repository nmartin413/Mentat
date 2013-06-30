

var mentat = {
	
	forge: {},
	model: {}

};


(function (ns) {

	var socket;
	var context;
	var mentalStates;

	var connectionView;
	var stateSelection;
	var mentalOverview;
	var statusView;

	/*----------------------------------*/

	Object.defineProperty(mentat, 'context', {
		get: function () { return context; }
	});

	Object.defineProperty(mentat, 'mentalStates', {
		get: function () { return mentalStates; }
	});

	/*----------------------------------*/

	function didInitSocket(initData) {
		console.log('Server sent init data... %o', initData);
		mentalStates.add(initData.mentalStates);
		
		stateSelection.refresh();

		statusView.statusText = "Connected";
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
		context = ns.forge.createContext();
		mentalStates = ns.model.createMentalStateCollection();

		statusView = ns.forge.createStatusView();
		statusView.bind(opts.statusElement);

		connectionView = ns.forge.createConnectionView();
		connectionView.bind(opts.connectionViewElement);

		stateSelection = ns.forge.createStateSelection();
		stateSelection.mentalStates = mentalStates;
		stateSelection.bind(opts.stateSelectionElement);
		stateSelection.on('didChangeMentalState', didChangeMentalState);

		mentalOverview = ns.forge.createMentalOverview();
		mentalOverview.bind(opts.overviewElement);

		statusView.statusText = "Initialized";
	}

	mentat.start = function () {
		socket = io.connect(location.origin);
		socket.on('init', didInitSocket);
		socket.on('didUpdateContext', _(didUpdateContext).debounce(500));

		statusView.statusText = "Waiting for connection...";
	}


}(mentat));