var GoogleMaps = require('../../react-google-maps');
var React = require('react');
var DataStore = require('../../../stores/DataStore.js');
var generalUtils = require('../../../utils/general.js');
var ReactBootstrap = require('react-bootstrap');
var ButtonInput = ReactBootstrap.ButtonInput;
 

var TheMap = React.createClass({

	getInitialState : function() {
		return {
			arrows : [],
			polygons : [],
			markers: []
		}
	},

	getMarkersForIterations: function(currentIteration) {
		var markers = [];
		for (var i = 0; i < currentIteration; i++) {
			var marker = {}
			var loc = DataStore.getIterationsForUser()[i].location;
			marker.coordinates = loc;
			marker.label = "iteration " + i.toString();
			markers.push(marker);
		}
		return markers;
	},

	componentWillMount : function() {
		var that = this;
		this.first = true;
		var center = {lat: 42.0, lng:30.0};
		this.setState({center: center});
		DataStore.addChangeListener(function() {
			

			var currentUserId = DataStore.getCurrentUser();
			var currentIteration = DataStore.getCurrentIteration();

			var userChanged = false;
			if (that.state.currentUserId !== currentUserId) {
				userChanged = true;
			} 
			that.setState({currentUserId: currentUserId}); //Set for next event 

			var iterationChanged = false;
			if (that.state.iteration !== currentIteration) {
				iterationChanged = true;
			}
			that.setState({currentIteration: currentIteration}); //Set for next event 
			

			// Get clusters
			var clusters = DataStore.getClustersForUser();
			var polygons = [];
			for (var clusterId in clusters) {
				var points = clusters[clusterId].points;
				polygons.push({
					coordinates : points,
					strokeColor: '#FF0000',
				    strokeOpacity: 0.8,
				    strokeWeight: 2,
				    fillColor: '#FF0000',
				    fillOpacity: 0.35
				});
			}
			that.setState({polygons: polygons});


			// Get Travels
			if (iterationChanged) {
				var currentIteration = DataStore.getCurrentIteration();
				var markers = that.getMarkersForIterations(currentIteration);
				
				
				that.setState({markers: markers});

				var iteration = DataStore.getIterationsForUser()[currentIteration];	

				//We will process these later
				var currentLocation = iteration.location;
				var locationClusterId = iteration.locationClusterId;


				var fromClusterId = iteration.fromClusterId;
				var toClusterId = iteration.toClusterId;

				var fromCenterPoint = generalUtils.calcCenterOfPolygon(clusters[fromClusterId].points);
				var toCenterPoint = generalUtils.calcCenterOfPolygon(clusters[toClusterId].points);

				var arrow = {coordinates : [fromCenterPoint, toCenterPoint], color: "#000000", strokeOpacity : 1.0, strokeWeight : 2};
				var arrows = [];
				arrows.push(arrow);
				that.setState({arrows:arrows});
			}
			
		});
	},

	componentDidMount : function() {
		
	},


	render : function() {
		var center = {lat:41.087839, lng: 29.046480};
		return (
			<div>
			<ButtonInput onClick={this.applyIteration} value="Switch Location View Mode" />
			<GoogleMaps markers={this.state.markers} polygons={this.state.polygons} arrows={this.state.arrows} center={center} zoom={12} mapTypeControl={true} elId="mapId" googleMapsClassName="map"/>
			</div>
		)
	}	
});


module.exports = TheMap;