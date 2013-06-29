

mentat.forge.createStateSelection = function () {
	var view = {};
	_(view).extend(_.clone(Backbone.Events));

	var rootElement;
	var allStateButtons;
	var activeStateButton;
	var currentState;

	/*----------------------------------*/

	Object.defineProperty(view, 'currentState', {
		get: function () { return currentState; },
		set: setCurrentState
	});

	/*----------------------------------*/

	function didClickStateButton(evt) {
		var targetButton = evt.currentTarget;
		makeStateButtonActive(targetButton);
		notifyMentalStateChange();
	}

	function makeStateButtonActive(btn) {
		$(allStateButtons).removeClass('disabled');
		$(btn).addClass('disabled');
		currentState = getValueForStateButton(btn);
	}

	function bindStateButtons() {
		allStateButtons = rootElement.querySelectorAll('[data-type=stateButton]');
	}

	function notifyMentalStateChange() {
		view.trigger('didChangeMentalState', currentState);
	}

	function setCurrentState(value) {
		var targetButton = getStateButtonForValue(value);
		makeStateButtonActive(targetButton);
	}

	function getStateButtonForValue(value) {
		return _(allStateButtons).detect(function (btn) {
			return getValueForStateButton(btn) === value
		});
	}

	function getValueForStateButton(btn) {
		return parseInt(btn.dataset.value, 10)
	}


	/*----------------------------------*/

	view.bind = function (targetElement) {
		rootElement = targetElement;
		$(rootElement).on('click', '[data-type=stateButton]', didClickStateButton);
		bindStateButtons();
	}

	return view;
};