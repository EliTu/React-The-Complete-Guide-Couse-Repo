import {
	AUTH_INIT,
	AUTH_SUCCESS,
	AUTH_FAIL,
	AUTH_SIGNOUT,
	REDIRECTED_TO_AUTH_PAGE,
} from './constants';
import axiosAuth from '../../../../axios/axios-auth';

export const authInit = authType => {
	return {
		type: AUTH_INIT,
		authType: authType,
		isSignInLoading: authType === 'signin',
	};
};

export const authSuccess = (idToken, userId, email) => {
	return {
		type: AUTH_SUCCESS,
		idToken: idToken,
		userId: userId,
		email: email,
	};
};
export const authFail = error => {
	return {
		type: AUTH_FAIL,
		error: error,
	};
};

export const authSignout = () => {
	return {
		type: AUTH_SIGNOUT,
		authType: 'signOut',
	};
};

export const redirectedToAuthPage = () => {
	return {
		type: REDIRECTED_TO_AUTH_PAGE,
	};
};

export const confirmAuth = (email, password, authType) => {
	return async dispatch => {
		dispatch(authInit(authType));

		let targetUrl =
			authType === 'signin'
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
					postAuthData.data.localId,
					postAuthData.data.email
				)
			);
			dispatch(logOutWhenTokenExpires(postAuthData.data.expiresIn));
		} catch (error) {
			dispatch(authFail(error));
		}
	};
};

export const logOutWhenTokenExpires = expireTime => {
	return async dispatch => {
		setTimeout(() => {
			dispatch(authSignout());
		}, expireTime * 1000);
	};
};
