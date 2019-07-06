import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	increment,
	decrement,
	add,
	subtract,
} from '../../store/actions/counterActions.js';
import { storeResult, delResult } from '../../store/actions/resultActions';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
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
				<hr />
				<button
					onClick={() =>
						this.props.handleStoreResult(this.props.reduxCounter)
					}
				>
					Store results
				</button>
				<ul>
					{this.props.reduxResults.map(result => (
						<li
							onClick={() =>
								this.props.handleDeleteResultClick(result.id)
							}
							key={result.id}
						>
							{result.value}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		reduxCounter: state.counterReducer.counter,
		reduxResults: state.resultReducer.results,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reduxIncCounter: () => dispatch(increment()),
		reduxDecCounter: () => dispatch(decrement()),
		reduxAddCounter: () => dispatch(add(5)),
		reduxSubCounter: () => dispatch(subtract(5)),
		handleStoreResult: res => dispatch(storeResult(res)),
		handleDeleteResultClick: id => dispatch(delResult(id)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Counter);
