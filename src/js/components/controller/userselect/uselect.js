var ReactBootstrap = require('react-bootstrap');
var React = require('react');
var DataStore = require('../../../stores/DataStore');



var UserSelect = React.createClass({

	componentWillMount: function() {
		DataStore.addChangeListener(function() {
			var users = DataStore.getUsers();
			this.setState({users: users});
		});
	},


	render : function() {
		var options = this.state.users.map(function(user) {
			return (
				<option value={user}>{user}</option>
			);
		});

		return (
			<Input type="select" label="Select" placeholder="select">
			  {options}
			</Input>
		);
	}

});