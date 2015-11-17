var render = require('react-dom').render;
var reactRouter = require('react-router');

var Router = reactRouter.Router;
var Route = reactRouter.Route;
var React = require('react');

var TheMap = require('./components/controller/map');

var App = React.createClass({
	

	render: function() {
		var center = {lat : 42, lng: 29};

		return (
			<TheMap />
			// <div className="aclass" />
		)
	}

});

render((
  <Router>
    <Route path="/" component={App}>
      
    </Route>
  </Router>
), document.getElementById('container'));