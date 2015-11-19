var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionConstants = require('../constants/main');

var actions = {
	changeIteration: function(iteration) {
		AppDispatcher.dispatch({
			actionType : actionConstants.ITERATION_CHANGE,
			iteration : iteration
		});
	}
}

module.exports = actions;

	


