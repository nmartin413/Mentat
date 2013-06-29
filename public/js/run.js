

(function () {

	function init () {
		mentat.init({
			connectionViewElement: document.querySelector('#connectionView'),
			stateSelectionElement: document.querySelector('#stateSelection'),
			overviewElement: document.querySelector('#mentalOverview')
		});
		mentat.start();
	}

	var loadQueue = [
		"//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js",
		"//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js",
		"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js",
		"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js",
		"js/app.js",
		"js/context.js",
		"js/connectionView.js",
		"js/stateSelection.js",
		"js/mentalOverview.js",
		"js/mentalSubview.js",
		init
	];

	head.js.apply(null, loadQueue);
	
}());


