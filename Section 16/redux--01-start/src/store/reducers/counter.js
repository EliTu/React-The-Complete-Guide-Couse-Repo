import * as actions from '../actions';

// The initial state set in the Redux store:
const initialState = {
	counter: 0,
};

// The main reducer function:
const counterReducer = (state = initialState, action) => {
	const { INCREMENT, DECREMENT, ADD, SUBTRACT } = actions;

	switch (action.type) {
		case INCREMENT:
			return {
				...state,
				counter: state.counter + 1,
			};

		case DECREMENT:
			return {
				...state,
				counter: state.counter - 1,
			};

		case ADD:
			return {
				...state,
				counter: state.counter + action.value,
			};

		case SUBTRACT:
			return {
				...state,
				counter: state.counter - action.value,
			};

		default:
			return state;
	}
};

export default counterReducer;
