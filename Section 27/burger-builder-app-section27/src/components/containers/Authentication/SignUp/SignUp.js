import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import signUpFormTemplate from './signUpFormTemplate/signUpFormTemplate';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import FormErrorMessage from '../../../UI/FormErrorMessage/FormErrorMessage';
import AuthErrorMessage from '../../../UI/AuthErrorMessage/AuthErrorMessage';
import styles from '../SignUp/SignUp.module.css';
import { confirmAuth } from '../store/actions';
import PropTypes from 'prop-types';

export const SignUp = ({
	isLoading,
	isSignInLoading,
	authType,
	error,
	sentAuthForm,
	isLoggedIn,
	isRedirectedToAuth,
	isBuilding,
	history,
}) => {
	// Local state hooks:
	const [fields, setFields] = useState(signUpFormTemplate);
	const [isFormValid, setIsFormValid] = useState(false);
	const [showFormInvalidMessage, setShowFormInvalidMessage] = useState(false);
	const [checkMinMax, setCheckMinMax] = useState(false);
	const [formErrorType, setFormErrorType] = useState('emptyFields');

	useEffect(() => {
		const checkFormValidation = () => {
			const formCopy = [...fields];
			const checkValid = formCopy.every(el => {
				return el.validation.valid;
			});

			setIsFormValid(checkValid);
		};
		checkFormValidation();
		if (isLoggedIn) {
			isBuilding && isRedirectedToAuth
				? history.push('/checkout')
				: history.push('/');
		}
	}, [
		checkMinMax,
		fields,
		history,
		isBuilding,
		isLoggedIn,
		isRedirectedToAuth,
	]);

	const handleFormChange = (event, data) => {
		let updatedForm = [...fields];
		let updatedFormData = updatedForm.forEach(el =>
			el.data === data
				? ((el.value = event.target.value),
				  (el.validation.valid = checkInputValidation(
						el.value,
						el.validation,
						el.data
				  )),
				  (el.validation.hasUserInput = true))
				: el
		);
		updatedForm.value = updatedFormData;

		setFields(updatedForm);
	};

	const checkInputValidation = (value, validation, type) => {
		let isValid = true;

		// General validation & empty field:
		if (validation.required) isValid = value.trim() !== '' && isValid;

		// Check the email regexp:
		if (validation.required && type === 'email')
			isValid = validation.emailValidationRegExp.test(value);

		// Check min-max characters requirement:
		if (validation.minLength && validation.maxLength)
			isValid =
				value.length + 1 >= validation.minLength &&
				value.length + 1 <= validation.maxLength;

		setCheckMinMax(isValid);

		return isValid;
	};

	const handleSubmitFormClick = event => {
		event.preventDefault();

		if (!isFormValid) {
			setShowFormInvalidMessage(true);
			setFormErrorType('emptyFields');
			return;
		}

		// Check if both passwords are not matching
		if (fields[1].value !== fields[2].value) {
			// Nullify 2nd password field value
			let resetValueCopy = [...fields];
			resetValueCopy[2].value = '';

			setFields(resetValueCopy);
			setIsFormValid(false);
			setShowFormInvalidMessage(true);
			setFormErrorType('noMatch');
			return;
		}

		// If all fields are valid
		if (isFormValid) {
			sentAuthForm(fields[0].value, fields[1].value, 'signup');

			let resetValueCopy = [...fields];
			resetValueCopy.forEach(field => (field.value = ''));

			setFields(resetValueCopy);
			setShowFormInvalidMessage(false);
		}
	};

	const handleCancelClick = () => history.replace('/');

	const { SignUp, MainHeader } = styles;

	return (
		<>
			<h1 className={MainHeader}>Registration</h1>
			<div className={SignUp}>
				{isLoading && !isSignInLoading ? (
					<Spinner />
				) : (
					<>
						<h2>Become a new member</h2>
						<form action="post" onSubmit={handleSubmitFormClick}>
							{fields.map((field, i) => (
								<Input
									key={field.data}
									focused={i === 0}
									elementType={field.elementType}
									elementConfig={field.elementConfig}
									validation={{ ...field.validation }}
									value={field.value}
									handleChange={event =>
										handleFormChange(event, field.data)
									}
									handleEnterPress={handleSubmitFormClick}
								/>
							))}
						</form>
						{showFormInvalidMessage ? (
							<FormErrorMessage errorType={formErrorType} />
						) : null}
						{error && authType === 'signup' ? (
							<AuthErrorMessage
								errorMessage={error.response.data.error.message}
							/>
						) : null}
						<Button
							type="Confirm"
							handleClick={handleSubmitFormClick}
						>
							Sign up
						</Button>
						<Button type="Danger" handleClick={handleCancelClick}>
							Go back
						</Button>
					</>
				)}
			</div>
		</>
	);
};

SignUp.propTypes = {
	isLoading: PropTypes.bool,
	isSignInLoading: PropTypes.bool,
	authType: PropTypes.string,
	error: PropTypes.object,
	sentAuthForm: PropTypes.func,
	isRedirectedToAuth: PropTypes.bool,
	isBuilding: PropTypes.bool,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isLoading: state.auth.isLoading,
		isSignInLoading: state.auth.isSignInLoading,
		error: state.auth.error,
		authType: state.auth.authType,
		isLoggedIn: state.auth.isLoggedIn,
		isRedirectedToAuth: state.auth.isRedirectedToAuth,
		isBuilding: state.burgerBuilder.isBuilding,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		sentAuthForm: (email, password, authType) =>
			dispatch(confirmAuth(email, password, authType)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUp);
