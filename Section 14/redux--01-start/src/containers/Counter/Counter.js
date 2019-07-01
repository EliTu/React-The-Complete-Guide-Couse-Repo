import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
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
				<button onClick={this.props.handleStoreResult}>
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
		reduxCounter: state.counter,
		reduxResults: state.results,
	};
};

const mapDispatchToProps = dispatch => {
	const {
		INCREMENT,
		DECREMENT,
		ADD,
		SUBTRACT,
		STORE_RESULT,
		DEL_RESULT,
	} = actions;

	return {
		reduxIncCounter: () => dispatch({ type: INCREMENT }),
		reduxDecCounter: () => dispatch({ type: DECREMENT }),
		reduxAddCounter: () => dispatch({ type: ADD, value: 5 }),
		reduxSubCounter: () => dispatch({ type: SUBTRACT, value: 5 }),
		handleStoreResult: () => dispatch({ type: STORE_RESULT }),
		handleDeleteResultClick: id => dispatch({ type: DEL_RESULT, id: id }),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Counter);
