var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;
var Row = ReactBootstrap.Row;
var ButtonInput = ReactBootstrap.ButtonInput;
var Col = ReactBootstrap.Col;

var React = require('react');
var DataStore = require('../../../stores/DataStore.js');

var ReactDom = require('react-dom');

var actions = require('../../../actions/IterationSelectActions.js');

var $ = require('jquery');

var IterationSelect = React.createClass({
	componentWillMount: function() {
		var one = 1;
		$("#iterationvalue").val(one.toString());
		var that = this;
		$('#iterationvalue').on("keypress", function(e) {
			if (e.keyCode == 13) {
	            that.applyIteration();
	        }
		});
	},

	applyIteration: function() {
		var iteration = parseInt($("#iterationvalue").val());
		actions.changeIteration(iteration);
	},

	iterationIncrease: function() {
		var iteration = parseInt($("#iterationvalue").val());
		$("#iterationvalue").val((iteration + 1).toString());
		actions.changeIteration(iteration + 1);
	},

	iterationDecrease: function() {
		var currentValue = parseInt($("#iterationvalue").val());
		if (currentValue > 1) {
			var iteration = parseInt($("#iterationvalue").val());
			$("#iterationvalue").val((iteration - 1).toString());
			actions.changeIteration(iteration - 1);	
		}
		
	},

	render : function() {
		return (
			
				<div className="show-grid">
					<Col md={3}>
						<Input ref="iterationvalueinput" type="text" placeholder="Iteration number" value="1" id="iterationvalue"/>
						
					</Col>

					<Col md={3}>
						<ButtonInput onClick={this.applyIteration} value="Go" />
					</Col>

					<Col md={3}>
						<ButtonInput onClick={this.iterationDecrease} value="-" />
					</Col>

					<Col md={3}>
						<ButtonInput onClick={this.iterationIncrease} value="+" />
					</Col>
				</div>
			
		)
	}
});

module.exports = IterationSelect;