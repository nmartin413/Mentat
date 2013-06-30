
// Mentat Status View
// ----------------------

mentat.forge.createStatusView = function () {
	var view = {};

	var rootElement;
	var statusTextElement;
	var statusText;

	Object.defineProperty(view, 'statusText', {
		get: function () { return statusText; },
		set: function (val) {
			var val = val || 'empty??';
			statusText = val;
			updateStatusElement();
		}
	});

	function updateStatusElement() {
		statusTextElement.innerHTML = statusText;
	}

	view.bind = function (targetElement) {
		rootElement = targetElement;
		statusTextElement = rootElement.querySelector('#currentStatusText');
	}

	return view;
}