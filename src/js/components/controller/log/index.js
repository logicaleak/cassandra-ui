var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;
var Table = ReactBootstrap.Table;	

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
			
			var allIterations = DataStore.getIterationsForUser();
			var iteration = DataStore.getIterationsForUser()[DataStore.getCurrentIteration()];
			var currentLocation = iteration.location;
			var locationTime = iteration.locationTime;
			var locationClusterId = iteration.locationClusterId;

			var prediction = iteration.prediction;
			var predictionType = iteration.predictionType;

			var fromClusterId = iteration.fromClusterId;
			var toClusterId = iteration.toClusterId;

			
			that.setState({
				currentLocation: currentLocation,
				locationTime: locationTime,
				locationClusterId: locationClusterId,
				prediction: prediction,
				predictionType: predictionType,
				fromClusterId: fromClusterId,
				toClusterId: toClusterId,
				allIterations: allIterations
			});


		});
	},
	render : function() {
		var rows;
		if (this.state.allIterations !== undefined) {
			rows = this.state.allIterations.map(function(iteration) {
				
				var isSuccessText;
				if (iteration.success) {
					isSuccessText = "True";
				} else {
					isSuccessText = "False";
				}
				return (
					<tr>
						<td>
							{iteration.location.lat}
						</td>
						<td>
							{iteration.location.lng}
						</td>
						<td>
							{iteration.locationTime}
						</td>
						<td>
							{iteration.locationClusterId}
						</td>
						<td>
							{iteration.clusterStateFirst}
						</td>
						<td>
							{iteration.clusterStateSecond}
						</td>
						<td>
							{iteration.timeClusterId}
						</td>
						<td>	
							{iteration.predictionType}
						</td>
						<td>
							{iteration.fromClusterId}
						</td>
						<td>
							{iteration.toClusterId}
						</td>
						<td>
							{iteration.nextTravelFirstCid}
						</td>
						<td>
							{iteration.nextTravelSecondCid}
						</td>
						<td>
							{iteration.nextTravelThirdCid}
						</td>
						<td>
							{iteration.nextTravelTime}
						</td>
						<td>
							{isSuccessText}
						</td>
					</tr>
				);
			});
		} else {
			rows = null;
		}


		
		
		return (
			<div className="log-div">
				<Table striped bordered condensed hover>
					<thead>
				      <tr>
				        <th>lat</th>
				        <th>lng</th>
				        <th>time</th>
				        <th>cluster id</th>
				        <th>State First</th>
				        <th>State Second</th>
				        <th>TC id</th>
				        <th>P Type</th>
				        <th>PR First Cid</th>
				        <th>PR Second Cid</th>
				        <th>Next T First Cid</th>
				        <th>Next T Second Cid</th>
				        <th>Next T Third Cid</th>
				        <th>Next T time</th>
				        <th>Success</th>

				      </tr>
				    </thead>
				    <tbody>
				    	{rows}
				    </tbody>
				</Table>
			</div>
		)
	}
});

module.exports = Log;
