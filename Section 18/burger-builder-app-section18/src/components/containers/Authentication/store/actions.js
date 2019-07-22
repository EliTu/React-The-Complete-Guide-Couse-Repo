import { AUTH_INIT, AUTH_SUCCESS, AUTH_FAIL } from './constants';
import axiosAuth from '../../../../axios/axios-auth';

export const authInit = isSignIn => {
	return {
		type: AUTH_INIT,
		isSignInLoading: isSignIn,
	};
};

export const authSuccess = (idToken, userId) => {
	return {
		type: AUTH_SUCCESS,
		idToken: idToken,
		userId: userId,
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
		dispatch(authInit(isSignIn));

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
			console.log(postAuthData.data);
			dispatch(
				authSuccess(
					postAuthData.data.idToken,
					postAuthData.data.localId
				)
			);
		} catch (error) {
			console.log(error);
			dispatch(authFail(error));
		}
	};
};
