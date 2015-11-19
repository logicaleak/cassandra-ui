var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;

var React = require('react');
var DataStore = require('../../../stores/DataStore.js');
var actions = require('../../../actions/UserSelectActions.js');



var UserSelect = React.createClass({

	getInitialState: function() {
		return {
			users : []
		};
	},

	componentWillMount: function() {
		var that = this;
		DataStore.addChangeListener(function() {
			var currentUser = DataStore.getCurrentUser();
			var users = DataStore.getUsers();
			that.setState({users: users});
			if (currentUser === null) {
				if (users.length < 1) {
					alert("no users sent");
				}
				actions.changeOrSetUser(users[0]);
			}
			
		});
	},

	userSelected: function(event) {
		var selectedUserId = event.target.value;
		actions.changeOrSetUser(selectedUserId);
	},


	render : function() {
		var options = this.state.users.map(function(user, i) {
			return (
				<option key={i} value={user}>{user}</option>
			);
		});

		return (
			<Input onChange={this.userSelected} type="select" label="Select User" placeholder="select">
			  {options}
			</Input>
		);
	}

});


module.exports = UserSelect;