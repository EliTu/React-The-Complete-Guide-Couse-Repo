import { AUTH_INIT, AUTH_SUCCESS, AUTH_FAIL } from './constants';

const INITIAL_STATE = {
	authType: '',
	idToken: '',
	userId: '',
	isLoggedIn: false,
	isLoading: false,
	isSignInLoading: false,
	error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AUTH_INIT:
			console.log(action.isSignInLoading);
			return {
				...state,
				isLoading: true,
				isSignInLoading: action.isSignInLoading,
				authType: action.authType,
			};

		case AUTH_SUCCESS:
			return {
				...state,
				idToken: action.idToken,
				userId: action.localId,
				isLoggedIn: true,
				isLoading: false,
				isSignInLoading: false,
				error: null,
			};

		case AUTH_FAIL:
			return {
				...state,
				isLoading: false,
				isSignInLoading: false,
				error: action.error,
			};

		default:
			return state;
	}
};

export default authReducer;
