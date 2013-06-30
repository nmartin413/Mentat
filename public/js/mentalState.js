(function (ns) {
	
	var defaults = {
		name: 'default',
		label: 'Default',
		buttonClass: ''
	};

	ns.createMentalStateCollection = function () {
		var coll = [];

		function addNew(atts) {
			var mentalState = ns.createMentalState(atts);
			coll.push(mentalState);
		}
		
		coll.add = function () {
			var attributes;
			var firstArg = _(arguments).first() || [];
			_.isArray(firstArg) ? attributes = firstArg : attributes = [firstArg];
			attributes.forEach(addNew);
		}

		return coll;
	}

	ns.createMentalState = function (atts) {
		var mentalState = {};

		var name = mentalState.name = atts.name || defaults.name;
		var label = mentalState.label = atts.label || defaults.label;
		var buttonClass = mentalState.buttonClass = atts.buttonClass || defaults.buttonClass;

		return mentalState;
	}
	
}(mentat.model));