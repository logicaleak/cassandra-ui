var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var _ = require('underscore');

var actions = require('../constants/main');
var urls = require('../constants/urls');

var ajax = require('../utils/ajax');
console.log(ajax);
var post_request = ajax.post_request;
var get_request = ajax.get_request;

var _data;
var _currentUser = null;
var _currentIteration = 1;



var DataStore = _.extend({}, EventEmitter.prototype, {


	getClustersForUser: function() {
		return _data.clusters[_currentUser];
	},

	getIterationsForUser: function() {
		return _data.iterations[_currentUser];
	},

	getDataForIteration: function(iteration) {
		return _data.iterations[_currentUser][iteration];
	},

	getUsers: function() {
		return _data.users;
	},

	getCurrentUser: function() {
		return _currentUser;
	},

	getCurrentIteration: function() {
		return _currentIteration;
	},

	//Run in the view on load
	getDataFromServer: function(callback, failurecallback) {
		var that = this;
		get_request(urls.GET_DATA, function(data) {
			_data = data;

			// IF we dont set current user firstly, userSelect view will not be affected
			// But the map cannot see the first user
			_currentUser = data.users[0];
			that.emitChange(); //Emit change for views to know that new data has arrived
			callback(data);
		}, function() {
			failurecallback();
		});
	},

	// Emit Change event
	emitChange: function() {
		this.emit('change');
	},

	// Add change listener
	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	// Remove change listener
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}
});

	
AppDispatcher.register(function(action) {
	
	console.log("Received payload from appdispatcher");
	console.log(action);

	switch (action.actionType) {
		case actions.ITERATION_CHANGE:
			console.log("iteration change");
			_currentIteration = action.iteration;
			console.log('currentIteration is ');
			console.log(_currentIteration);
			DataStore.emitChange();
			break;
		case actions.USER_CHANGE:
			console.log("it is a user change");
			_currentUser = action.userId;
			console.log("Now _currentUser is " + _currentUser);
			_currentIteration = 1;
			DataStore.emitChange();
			break;
		default:
			break;
	}
});

module.exports = DataStore;