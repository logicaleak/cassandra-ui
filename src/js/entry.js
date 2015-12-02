var render = require('react-dom').render;
var reactRouter = require('react-router');

var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Grid;
var ButtonInput = ReactBootstrap.ButtonInput;

var Router = reactRouter.Router;
var Route = reactRouter.Route;
var React = require('react');

var TheMap = require('./components/controller/map');
var USelect = require('./components/controller/userselect');
var ISelect = require('./components/controller/iterationselect');
var Log = require('./components/controller/log');

var DataStore = require('./stores/DataStore.js');

var $ = require('jquery');

var App = React.createClass({

	getInitialState: function() {
		return {
			mapCol: 8,
			logCol: 4,
			mapBigger: true
		}
	},

	componentWillMount: function() {
		DataStore.getDataFromServer(function() {}, function() {});
	},

	switchSizeMode: function() {
		if (this.state.mapBigger) {
			this.setState({
				mapCol: 4,
				logCol: 8,
				mapBigger: false
			});	
		} else {
			this.setState({
				mapCol: 8,
				logCol: 4,
				mapBigger: true
			});
		}
		
	},

	render: function() {
		var center = {lat : 42, lng: 29};

		return (
			<Grid>
				
					
				<USelect />
				<Row>
					<Col xs={3}>
						<ISelect />
					</Col>
					<Col xs={3}>
						<ButtonInput onClick={this.switchSizeMode} value="Switch Size Mode" />
					</Col>
					<Col xs={6}></Col>
				</Row>

				<Row>
					<Col xs={this.state.mapCol}>
						<TheMap />
					</Col>
					<Col xs={this.state.logCol}>
						<Log />
					</Col>
				</Row>
				
			</Grid>	

			
		)
	}

});

render((
  <Router>
    <Route path="/" component={App}>
      
    </Route>
  </Router>
), document.getElementById('cascontainer'));