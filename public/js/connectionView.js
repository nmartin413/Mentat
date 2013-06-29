

mentat.forge.createConnectionView = function () {

	var view = {};

	var rootElement;
	var countElement;
	var suffixElement;
	var displayCount;

	(function () {
		countElement = document.createElement('span');
		updateCount();
		suffixElement = document.createElement('span');
		updateSuffix();
	}());

	Object.defineProperty(view, 'displayCount', {
		get: function () { return displayCount; },
		set: function (value) {
			displayCount = value;
			updateCount();
		}
	});

	function updateCount () {
		var text = displayCount || '??';
		countElement.innerHTML = text;
	}

	function updateSuffix () {
		var text = (displayCount < 1) ? ' active connection' : ' active connections';
		suffixElement.innerHTML = text;
	}
	
	function populateRootElement () {
		rootElement.appendChild(countElement);
		rootElement.appendChild(suffixElement);
	}


	view.bind = function (targetEl) {
		rootElement = targetEl;
		populateRootElement();
	}

	return view;

};