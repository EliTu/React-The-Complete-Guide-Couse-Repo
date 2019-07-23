import { AUTH_INIT, AUTH_SUCCESS, AUTH_FAIL, AUTH_SIGNOUT } from './constants';

const INITIAL_STATE = {
	authType: '',
	idToken: '',
	userId: '',
	email: '',
	isLoggedIn: false,
	isLoading: false,
	isSignInLoading: false,
	error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AUTH_INIT:
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
				userId: action.userId,
				email: action.email,
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

		case AUTH_SIGNOUT:
			return {
				...state,
				idToken: '',
				userId: '',
				isLoggedIn: false,
				isLoading: false,
				isSignInLoading: false,
				error: null,
			};
		default:
			return state;
	}
};

export default authReducer;
