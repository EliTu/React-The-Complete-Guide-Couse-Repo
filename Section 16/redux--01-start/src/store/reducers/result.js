import * as actions from '../actions/actions';

const initialState = {
	results: [],
};

const resultReducer = (state = initialState, action) => {
	const { STORE_RESULT, DEL_RESULT } = actions;

	switch (action.type) {
		case STORE_RESULT:
			return {
				...state,
				results: state.results.concat({
					value: action.result,
					id: new Date(),
				}),
			};

		case DEL_RESULT:
			const updatedArr = state.results.filter(
				result => result.id !== action.id
			);
			return {
				...state,
				results: updatedArr,
			};

		default:
			return state;
	}
};

export default resultReducer;
