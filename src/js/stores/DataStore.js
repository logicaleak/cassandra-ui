var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var _ = require('underscore');

var actions = require('../constants/main');
var urls = require('../constants/urls');

var post_request = require('../utils/ajax').post_request;
var get_request = require('../utils/ajax').get_request;

var _data;
var _currentUser = "1";
var _currentLocation = "1";

var mock = {
	users : [
		"aaaaaaaaaaaaaaaaaaaaaaaa",
		"bbbbbbbbbbbbbbbbbbbbbbbb"
	],
	aaaaaaaaaaaaaaaaaaaaaaaa: {
		1: {
			prediction: true,
			time: "14:00:00",
			fromClusterPolygon: [],
			fromClusterNo: 300,
			toClusterPolygon: [],
			toClusterNo: 301
		},
		2: {
			prediction: true,
			time: "15:00:00",
			fromClusterPolygon: [],
			fromClusterNo: 301,
			toClusterPolygon: [],
			toClusterNo: 302
		},
		3: {
			prediction: true,
			time: "16:00:00",
			fromClusterPolygon: [],
			fromClusterNo: 302,
			toClusterPolygon: [],
			toClusterNo: 300
		}
	},
	bbbbbbbbbbbbbbbbbbbbbbbb: {
		1: {
			prediction: true,
			time: "14:00:00",
			fromClusterPolygon: [],
			fromClusterNo: 300,
			toClusterPolygon: [],
			toClusterNo: 301
		},
		2: {
			prediction: true,
			time: "15:00:00",
			fromClusterPolygon: [],
			fromClusterNo: 301,
			toClusterPolygon: [],
			toClusterNo: 302
		},
		3: {
			prediction: true,
			time: "16:00:00",
			fromClusterPolygon: [],
			fromClusterNo: 302,
			toClusterPolygon: [],
			toClusterNo: 300
		}
	}
}

var DataStore = _.extend({}, EventEmitter.prototype, {

	getDataForCurrentLocationAndUser: function() {
		return _data[_currentUser][_currentLocation];
	},

	getUsers: function() {
		return _data.users;
	}

	//Run in the view on load
	getDataFromServer: function(callback, failurecallback) {
		// get_request(urls.GET_DATA, function(data) {
		// 	_data = data;
		// 	callback(data);
		// }, function() {
		// 	failurecallback();
		// });
		_data = mock;
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
}

	
AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch (action.actionType) {
		case actions.LOCATION_ARRIVAL_TRIGGER:
			_currentLocation = action.locationIndex;
			DataStore.emitChange();
			break;
		case actions.DIFFERENT_USER:
			_currentUser = action.userId;
			_currentLocation = "1";
			DataStore.emitChange();
			break;
		default:
			break;
	}
});