import { AUTH_INIT, AUTH_SUCCESS, AUTH_FAIL } from './constants';
import axiosInstace from '../../../../axios-orders';

export const authInit = () => {
	return {
		type: AUTH_INIT,
	};
};

export const authSuccess = authData => {
	return {
		type: AUTH_SUCCESS,
		authData: authData,
	};
};
export const authFail = error => {
	return {
		type: AUTH_FAIL,
		error: error,
	};
};

export const confirmAuth = (username, email, password) => {
	return async dispatch => {
		console.log('Fired!');
		dispatch(authInit());
	};
};
