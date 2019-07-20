import { SIGNIN_TOGGLE_CLICK } from './actions';

const INITIAL_STATE = {
	isSignInDisplayed: false,
};

const signInReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGNIN_TOGGLE_CLICK:
			return {
				...state,
				isSignInDisplayed: !state.isSignInDisplayed,
			};
		default:
			return state;
	}
};

export default signInReducer;
