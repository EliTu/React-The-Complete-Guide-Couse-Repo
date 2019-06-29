import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
	state = {
		counter: 0,
	};

	counterChangedHandler = (action, value) => {
		switch (action) {
			case 'inc':
				this.setState(prevState => {
					return { counter: prevState.counter + 1 };
				});
				break;
			case 'dec':
				this.setState(prevState => {
					return { counter: prevState.counter - 1 };
				});
				break;
			case 'add':
				this.setState(prevState => {
					return { counter: prevState.counter + value };
				});
				break;
			case 'sub':
				this.setState(prevState => {
					return { counter: prevState.counter - value };
				});
				break;
		}
	};

	render() {
		return (
			<div>
				<CounterOutput value={this.props.reduxCounter} />
				<CounterControl
					label="Increment"
					clicked={this.props.reduxIncCounter}
				/>
				<CounterControl
					label="Decrement"
					clicked={this.props.reduxDecCounter}
				/>
				<CounterControl
					label="Add 5"
					clicked={this.props.reduxAddCounter}
				/>
				<CounterControl
					label="Subtract 5"
					clicked={this.props.reduxSubCounter}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		reduxCounter: state.counter,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reduxIncCounter: () => dispatch({ type: 'INCREMENT' }),
		reduxDecCounter: () => dispatch({ type: 'DECREMENT' }),
		reduxAddCounter: () => dispatch({ type: 'ADD', value: 5 }),
		reduxSubCounter: () => dispatch({ type: 'SUBTRACT', value: 5 }),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Counter);
