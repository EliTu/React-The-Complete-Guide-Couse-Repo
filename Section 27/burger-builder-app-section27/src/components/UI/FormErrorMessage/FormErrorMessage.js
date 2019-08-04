import React from 'react';
import styles from './FormErrorMessage.module.css';
import PropTypes from 'prop-types';

const FormErrorMessage = ({ errorType }) => {
	// CSS Modules styles:
	const { FormErrorMessage } = styles;

	const displayErrorMessage = () => {
		switch (errorType) {
			case 'noMatch':
				return (
					<p>
						The passwords you entered did not match! please try
						again.
					</p>
				);
			case 'emptyFields':
				return (
					<p>
						Please properly fill out all the required fields before
						submitting.
					</p>
				);
			default:
				return '';
		}
	};

	return <div className={FormErrorMessage}>{displayErrorMessage()}</div>;
};

FormErrorMessage.propTypes = {
	errorType: PropTypes.string,
};

export default FormErrorMessage;
