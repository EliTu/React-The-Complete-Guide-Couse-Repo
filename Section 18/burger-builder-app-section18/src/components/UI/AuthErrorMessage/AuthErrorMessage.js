import React from 'react';
import styles from './AuthErrorMessage.module.css';
import PropTypes from 'prop-types';

const AuthErrorMessage = ({ errorMessage }) => {
	// CSS Modules Styles
	const { AuthErrorMessage } = styles;

	const customErrorMessage = () => {
		switch (errorMessage) {
			case 'EMAIL_EXISTS':
				return `The email you've provided is already taken. Please provide a different email address`;

			case 'TOO_MANY_ATTEMPTS_TRY_LATER':
				return 'Too many attempts. Please try again later';

			case 'EMAIL_NOT_FOUND':
				return `The email you've provided does not exist. Please try signing in with a different address or register a new user with the unused email`;

			case 'INVALID_PASSWORD':
				return 'Wrong password. Please try again';

			case 'USER_DISABLED':
				return `The user account you're trying to sign in to has been disabled`;

			default:
				return 'an Unexpected error occurred!';
		}
	};

	return (
		<>
			<p className={AuthErrorMessage}>{customErrorMessage()}</p>
		</>
	);
};

AuthErrorMessage.propTypes = {
	errorMessage: PropTypes.string,
};

export default AuthErrorMessage;
