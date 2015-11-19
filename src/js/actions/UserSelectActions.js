var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionConstants = require('../constants/main');

var actions = {
	changeOrSetUser: function(userId) {
		AppDispatcher.dispatch({
			actionType : actionConstants.USER_CHANGE,
			userId : userId
		});
	}
}

module.exports = actions;

	


