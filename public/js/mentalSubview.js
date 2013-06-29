mentat.forge.createMentalSubview = function () {

	var view = {};

	var rootElement,
		totalCount,
		groupCount;

	(function () {
		rootElement = document.createElement('div')
		$(rootElement).addClass('bar');
	}());

	/*----------------------------------*/

	Object.defineProperty(view, 'el', {
		get: function () { return rootElement; }
	});

	Object.defineProperty(view, 'totalCount', {
		get: function () { return totalCount; },
		set: function (val) {
			totalCount = val;
			updateWidth();
		}
	});

	Object.defineProperty(view, 'groupCount', {
		get: function () { return groupCount; },
		set: function (val) {
			groupCount = val;
			updateWidth();
		} 
	});

	/*----------------------------------*/

	function updateWidth() {
		var targetWidth = (groupCount / totalCount) * 100; 
		$(rootElement).css('width', targetWidth + '%');
	}

	return view;
};