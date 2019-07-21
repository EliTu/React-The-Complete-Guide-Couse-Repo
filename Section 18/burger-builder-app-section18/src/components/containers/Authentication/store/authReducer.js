import { AUTH_INIT, AUTH_SUCCESS, AUTH_FAIL } from './constants';

const INITIAL_STATE = {
	isLoggedIn: false,
	idToken: '',
	userId: '',
	isLoading: false,
	error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AUTH_INIT:
			return {
				...state,
				isLoading: true,
			};

		case AUTH_SUCCESS:
			return {
				...state,
				idToken: action.idToken,
				userId: action.localId,
				isLoggedIn: true,
				isLoading: false,
				error: null,
			};

		case AUTH_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};

		default:
			return state;
	}
};

export default authReducer;
