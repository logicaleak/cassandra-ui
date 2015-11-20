var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;

var React = require('react');
var DataStore = require('../../../stores/DataStore.js');

var Log = React.createClass({

	getInitialState : function() {
		return {
			currentLocation: "",
			locationTime: "",
			locationClusterId: "",
			prediction: "",
			predictionType: "",
			fromClusterId: "",
			toClusterId: "",
			predictionText: ""
		}
	},

	componentWillMount: function() {
		var that = this;
		DataStore.addChangeListener(function() {
			console.log('change in log');

			var iteration = DataStore.getIterationsForUser()[DataStore.getCurrentIteration()];
			var currentLocation = iteration.location;
			var locationTime = iteration.locationTime;
			var locationClusterId = iteration.locationClusterId;

			var prediction = iteration.prediction;
			var predictionType = iteration.predictionType;

			var fromClusterId = iteration.fromClusterId;
			var toClusterId = iteration.toClusterId;

			
			var predictionText;
			var predictionType;
			if (prediction === true) {
				predictionText = "Prediction Successful";
			} else {
				predictionText = "Prediction NOT Successful";
			}

			that.setState({
				currentLocation: currentLocation,
				locationTime: locationTime,
				locationClusterId: locationClusterId,
				prediction: prediction,
				predictionType: predictionType,
				fromClusterId: fromClusterId,
				toClusterId: toClusterId,
				predictionText: predictionText
			});


		});
	},
	render : function() {

		console.log('state');
		console.log(this.state);
		return (
			<div>
				<div>
					{this.state.predictionText}
				</div>
				<div>
					{this.state.predictionType}
				</div>
				<div>
					Location : {this.state.currentLocation.lng}  {this.state.currentLocation.lat}
				</div>
				<div>
					Location time : {this.state.locationTime}
				</div>
				<div>
					Location Cluster Id : {this.state.locationClusterId}
				</div>
				<div>
					From CLuster : {this.state.fromClusterId}
				</div>
				<div>
					To Cluster : {this.state.toClusterId}
				</div>
			</div>
		)
	}
});

module.exports = Log;