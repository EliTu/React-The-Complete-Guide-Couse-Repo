import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import signInForm from './signInForm/signInForm';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import Spinner from '../../../UI/Spinner/Spinner';
import FormErrorMessage from '../../../UI/FormErrorMessage/FormErrorMessage';
import AuthErrorMessage from '../../../UI/AuthErrorMessage/AuthErrorMessage';
import { signInOutsideCloseClick } from '../../../display/Navigation/AuthItems/store/actions';
import { confirmAuth } from '../store/actions';
import styles from './SignIn.module.css';
import PropTypes from 'prop-types';

const SignIn = ({
	isSignInDisplayed,
	isLoading,
	error,
	authType,
	sentAuthForm,
	closeSignIn,
	isLoggedIn,
	isBuilding,
	isRedirectedToAuth,
	...props
}) => {
	// CSS Modules styles:
	const { SignIn, Open, Closed, SuccessMessage } = styles;

	// State hooks:
	const [fields, setFields] = useState(signInForm);
	const [isFormValid, setIsFormValid] = useState(false);
	const [showFormInvalidMessage, setShowFormInvalidMessage] = useState(false);
	const [checkMinMax, setCheckMinMax] = useState(false);

	// Toggle component display upon clicking the navbar link
	const setDisplayStyle = isSignInDisplayed ? Open : Closed;

	// Handle changes upon typing in the input fields
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
		setFields([...updatedForm]);
	};

	// Check form validation upon changes to fields and minMax requirements
	useEffect(() => {
		const checkFormValidation = () => {
			const formCopy = [...fields];
			const checkValid = formCopy.every(el => {
				return el.validation.valid;
			});

			setIsFormValid(checkValid);
		};
		checkFormValidation();
	}, [checkMinMax, fields]);

	// Check requirements for the input fields for validations
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

	// Handle form submittion
	const handleSubmitFormClick = event => {
		event.preventDefault();

		if (!isFormValid) {
			setShowFormInvalidMessage(true);
			return;
		}

		// If all fields are valid
		if (isFormValid) {
			sentAuthForm(fields[0].value, fields[1].value, 'signin');
			setShowFormInvalidMessage(false);
		}
	};

	// Handle clicks on elements outside of the component to close it
	const myRef = useRef();
	const handleOutsideClick = useCallback(
		event => {
			if (isSignInDisplayed && !myRef.current.contains(event.target)) {
				closeSignIn();
			}
		},
		[closeSignIn, isSignInDisplayed]
	);

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);
		return () => document.removeEventListener('click', handleOutsideClick);
	}, [handleOutsideClick]);

	// Check if should be redirecting to checkout upon a sign in:
	const redirectToCheckout = useCallback(() => {
		if (isLoggedIn && isBuilding && isRedirectedToAuth)
			props.history.push('/checkout');
	}, [isBuilding, isLoggedIn, isRedirectedToAuth, props.history]);

	useEffect(() => {
		redirectToCheckout();
	}, [redirectToCheckout]);

	return (
		<div className={[SignIn, setDisplayStyle].join(' ')} ref={myRef}>
			<>
				{!isLoggedIn ? (
					isLoading ? (
						<Spinner />
					) : (
						<>
							<h2>Members Login</h2>
							<form
								action="post"
								onSubmit={handleSubmitFormClick}
							>
								{fields.map((field, i) => (
									<Input
										key={field.data}
										focused={i === 0 && isSignInDisplayed}
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
							{showFormInvalidMessage && (
								<FormErrorMessage errorType="emptyFields" />
							)}
							{error && authType === 'signin' && (
								<AuthErrorMessage
									errorMessage={
										error.response.data.error.message
									}
								/>
							)}
							<Button
								type="Confirm"
								handleClick={handleSubmitFormClick}
							>
								Login
							</Button>
						</>
					)
				) : (
					<p className={SuccessMessage}>Sign in success!</p>
				)}
			</>
		</div>
	);
};

SignIn.propTypes = {
	isSignInDisplayed: PropTypes.bool,
	isLoading: PropTypes.bool,
	error: PropTypes.object,
	authType: PropTypes.string,
	isLoggedIn: PropTypes.bool,
	closeSignIn: PropTypes.func,
	sentAuthForm: PropTypes.func,
	isRedirectedToAuth: PropTypes.bool,
	isBuilding: PropTypes.bool,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isSignInDisplayed: state.signIn.isSignInDisplayed,
		isLoading: state.auth.isLoading,
		authType: state.auth.authType,
		error: state.auth.error,
		isLoggedIn: state.auth.isLoggedIn,
		isRedirectedToAuth: state.auth.isRedirectedToAuth,
		isBuilding: state.burgerBuilder.isBuilding,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeSignIn: () => dispatch(signInOutsideCloseClick()),
		sentAuthForm: (email, password, authType) =>
			dispatch(confirmAuth(email, password, authType)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(SignIn));
