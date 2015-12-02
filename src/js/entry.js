var render = require('react-dom').render;
var reactRouter = require('react-router');

var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Grid;

var Router = reactRouter.Router;
var Route = reactRouter.Route;
var React = require('react');

var TheMap = require('./components/controller/map');
var USelect = require('./components/controller/userselect');
var ISelect = require('./components/controller/iterationselect');
var Log = require('./components/controller/log');

var DataStore = require('./stores/DataStore.js');

var App = React.createClass({
	componentWillMount: function() {
		DataStore.getDataFromServer(function() {}, function() {});
	},

	render: function() {
		var center = {lat : 42, lng: 29};

		return (
			<div className="container-fluid">
				
					
				<USelect />
			
		
				<ISelect />
					
				
				<Col xs={8}>
					<TheMap />
				</Col>
				<Col xs={4}>
					<Log />
				</Col>
				
				
			</div>	

			
		)
	}

});

render((
  <Router>
    <Route path="/" component={App}>
      
    </Route>
  </Router>
), document.getElementById('cascontainer'));