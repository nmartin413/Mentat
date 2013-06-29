

mentat.forge.createMentalOverview = function () {

	var view = {};

	var rootElement,
		subviews,
		positiveView,
		neutralView,
		negativeView,
		totalCount,
		counts;

	(function () {
		subviews = [];

		negativeView = mentat.forge.createMentalSubview();
		$(negativeView.el).addClass('bar-danger');
		subviews.push(negativeView);

		neutralView = mentat.forge.createMentalSubview();
		$(neutralView.el).addClass('bar-warning');
		subviews.push(neutralView);

		positiveView = mentat.forge.createMentalSubview();
		$(positiveView.el).addClass('bar-success');
		subviews.push(positiveView);

	}());

	/*----------------------------------*/

	Object.defineProperty(view, 'counts', {
		get: function () { return counts; },
		set: setCounts
	});

	Object.defineProperty(view, 'totalCount', {
		get: function () { return totalCount; },
		set: function (val) {
			totalCount = val;
			_(subviews).each(function (subview) { subview.totalCount = totalCount; });
		}
	})

	/*----------------------------------*/

	function setCounts(value) {
		counts = value;
		updateSubviews();
	}

	function updateSubviews() {
		_(subviews).each(function (subview, index) {
			subview.groupCount = counts[index];
		});
	}

	function addSubviews() {
		_(subviews).each(function (subview) {
			rootElement.appendChild(subview.el);
		});
	}

	/*----------------------------------*/

	view.bind = function (targetElement) {
		rootElement = targetElement;
		addSubviews();
	}


	return view;

};