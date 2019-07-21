import { AUTH_INIT, AUTH_SUCCESS, AUTH_FAIL } from './constants';
import axiosAuth from '../../../../axios/axios-auth';
// import axios from 'axios';

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

export const confirmAuth = (email, password, isSignIn) => {
	return async dispatch => {
		console.log('Fired!');
		dispatch(authInit());

		let targetUrl = isSignIn
			? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOcUCI2YMZXtVJkuOcYMAttj8XXDMyR7M'
			: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCOcUCI2YMZXtVJkuOcYMAttj8XXDMyR7M';

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		try {
			const postAuthData = await axiosAuth.post(targetUrl, authData);
			console.log(postAuthData);
			dispatch(authSuccess(postAuthData));
		} catch (error) {
			console.log(error);
			dispatch(authFail(error));
		}
	};
};
