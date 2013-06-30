

mentat.forge.createStateSelection = function () {
	var view = {};
	_(view).extend(_.clone(Backbone.Events));

	var rootElement;
	var allStateButtons;
	var activeStateButton;
	var stateButtonWrap;
	var currentState;
	var mentalStates;

	/*----------------------------------*/

	Object.defineProperty(view, 'currentState', {
		get: function () { return currentState; },
		set: setCurrentState
	});

	Object.defineProperty(view, 'mentalStates', {
		get: function () { return mentalStates; },
		set: function (val) {
			mentalStates = val;
			render();
		}
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

	function createStateButtonMarkup() {
		return _(mentalStates).reduce(function (memo, mentalState) {
			var html = '<div class="state-button">';
			html += '<span data-type="stateButton"';
			html += ' data-name="';
			html += mentalState.name;
			html += '"';
			html += ' class="btn btn-large ';
			html += mentalState.buttonClass;
			html += '">';
			html += mentalState.label;
			html += '</span>';
			html += '</div>';
			return memo + html;
		}, '');
	}

	function bindStateButtons() {
		allStateButtons = rootElement.querySelectorAll('[data-type=stateButton]');
	}

	function notifyMentalStateChange() {
		view.trigger('didChangeMentalState', currentState);
	}

	function setCurrentState(value) {
		var targetButton = getButtonForValue(value);
		if (targetButton) {
			makeStateButtonActive(targetButton);
		}
		else {
			console.warn('Could not find a state button for value %o', value);
		}
	}

	function getButtonForValue(value) {
		return _(allStateButtons).detect(function (btn) {
			return getValueForStateButton(btn) === value
		});
	}

	function getValueForStateButton(btn) {
		return btn.dataset.name;
	}

	function render () {
		if (stateButtonWrap && rootElement) {
			stateButtonWrap.innerHTML = createStateButtonMarkup();
			bindStateButtons();
		}
	}

	/*----------------------------------*/

	view.bind = function (targetElement) {
		rootElement = targetElement;
		stateButtonWrap = rootElement.querySelector('#stateButtonWrap');
		$(rootElement).on('click', '[data-type=stateButton]', didClickStateButton);
		render();
	}

	view.refresh = function () {
		render();
	}


	return view;
};