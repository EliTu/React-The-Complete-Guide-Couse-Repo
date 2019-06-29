// The initial state set in the Redux store:
const initialState = {
	counter: 0,
};

// The main reducer function:
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INCREMENT':
			state = {
				...state,
				counter: state.counter + 1,
			};
			break;

		case 'DECREMENT':
			state = {
				...state,
				counter: state.counter - 1,
			};
			break;

		default:
			return state;
	}
	return state;
};

export default reducer;
