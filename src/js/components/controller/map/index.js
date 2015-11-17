var GoogleMaps = require('../../react-google-maps');
var React = require('react');
 

var TheMap = React.createClass({

	componentWillMount : function() {
		var arrow = {coordinates : [{lat: 41.038994, lng: 28.851504}, {lat: 41.065920, lng: 28.936648}], color : "#000000", strokeOpacity : 1.0, strokeWeight : 2} ;
		var arrows = Array();
		arrows.push(arrow);
		this.setState({arrows: arrows});
	},

	componentDidMount : function() {
		console.log('themap component did mount');
		setTimeout(this.updateArrow, 3000);
		
	},


	render : function() {
		var center = {lat: 41.038994, lng: 28.851504};

		return (
			<GoogleMaps arrows={this.state.arrows} center={center} zoom={12} mapTypeControl={true} elId="mapId" googleMapsClassName="sth"/>
		)
	}	
});


module.exports = TheMap;