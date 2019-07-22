import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import signInForm from './signInForm/signInForm';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import Spinner from '../../../UI/Spinner/Spinner';
import AuthErrorMessage from '../../../UI/AuthErrorMessage/AuthErrorMessage';
import { signInOutsideCloseClick } from '../../../display/Navigation/AuthItems/store/actions';
import { confirmAuth } from '../store/actions';
import styles from './SignIn.module.css';
import PropTypes from 'prop-types';

const SignIn = ({
	isSignInDisplayed,
	isLoading,
	error,
	sentAuthForm,
	closeSignIn,
}) => {
	// CSS Modules styles:
	const { SignIn, Open, Closed } = styles;

	// State hooks:
	const [fields, setFields] = useState(signInForm);
	const [isFormValid, setIsFormValid] = useState(false);
	const [showFormInvalidMessage, setShowFormInvalidMessage] = useState(false);
	const [checkMinMax, setCheckMinMax] = useState(false);

	// Toggle component display upon clicking the navbar link
	const setDisplayStyle = isSignInDisplayed ? Open : Closed;

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

	const handleSubmitFormClick = event => {
		event.preventDefault();

		if (!isFormValid) {
			setShowFormInvalidMessage(true);
			return;
		}

		// If all fields are valid
		const isSignIn = true;
		if (isFormValid) {
			sentAuthForm(fields[0].value, fields[1].value, isSignIn);
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

	return (
		<div className={[SignIn, setDisplayStyle].join(' ')} ref={myRef}>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<h2>Members Login</h2>
					<form action="post" onSubmit={handleSubmitFormClick}>
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
					{error ? (
						<AuthErrorMessage
							errorMessage={error.response.data.error.message}
						/>
					) : null}
					<Button type="Confirm" handleClick={handleSubmitFormClick}>
						Login
					</Button>
				</>
			)}
		</div>
	);
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isSignInDisplayed: state.signIn.isSignInDisplayed,
		isLoading: state.auth.isLoading,
		error: state.auth.error,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeSignIn: () => dispatch(signInOutsideCloseClick()),
		sentAuthForm: (email, password, isSignIn) =>
			dispatch(confirmAuth(email, password, isSignIn)),
	};
};

SignIn.propTypes = {
	isSignInDisplayed: PropTypes.bool,
	isLoading: PropTypes.bool,
	error: PropTypes.object,
	closeSignIn: PropTypes.func,
	sentAuthForm: PropTypes.func,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignIn);
