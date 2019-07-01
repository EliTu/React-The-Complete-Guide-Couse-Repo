import * as actions from '../actions/action';

const initialState = {
	persons: [],
};

const personReducer = (state = initialState, action) => {
	const { ADD_PERSON, DEL_PERSON } = actions;

	switch (action.type) {
		case ADD_PERSON:
			return {
				...state,
				persons: state.persons.concat(action.data),
			};

		case DEL_PERSON:
			const updatedPersonsArr = state.persons.filter(
				person => person.id !== action.id
			);
			return {
				...state,
				persons: updatedPersonsArr,
			};

		default:
			return state;
	}
};

export default personReducer;
