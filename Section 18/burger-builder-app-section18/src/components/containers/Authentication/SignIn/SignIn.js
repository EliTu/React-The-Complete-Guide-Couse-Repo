import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import Spinner from '../../../UI/Spinner/Spinner';
import signInForm from './signInForm/signInForm';
import { signInOutsideCloseClick } from '../../../display/Navigation/AuthItems/store/actions';
import { confirmAuth } from '../store/actions';
import styles from './SignIn.module.css';

const SignIn = props => {
	// CSS Modules styles:
	const { SignIn, Open, Closed } = styles;

	// State hooks:
	const [fields, setFields] = useState(signInForm);
	const [isFormValid, setIsFormValid] = useState(false);
	const [showFormInvalidMessage, setShowFormInvalidMessage] = useState(false);
	const [checkMinMax, setCheckMinMax] = useState(false);

	// Toggle component display upon clicking the navbar link
	const setDisplayStyle = props.isSignInDisplayed ? Open : Closed;

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

		// Check if both passwords are not matching
		// if (this.state.fields[1].value !== this.state.fields[2].value) {
		// 	// Nullify 2nd password field value
		// 	let resetValueCopy = [...this.state.fields];
		// 	resetValueCopy[2].value = '';

		// 	this.setState({
		// 		fields: resetValueCopy,
		// 		isFormValid: false,
		// 		showFormInvalidMessage: true,
		// 		formErrorType: 'noMatch',
		// 	});
		// 	return;
		// }

		// If all fields are valid
		const isSignIn = true;
		if (isFormValid) {
			props.sentAuthForm(fields[0].value, fields[1].value, isSignIn);

			// let resetValueCopy = [...this.state.fields];
			// resetValueCopy.forEach(field => (field.value = ''));

			// this.setState({
			// 	fields: resetValueCopy,
			// 	showFormInvalidMessage: false,
			// });

			// props.closeSignIn();
		}
	};

	// Handle clicks on elements outside of the component to close it
	const myRef = useRef();
	const handleOutsideClick = useCallback(
		event => {
			if (
				props.isSignInDisplayed &&
				!myRef.current.contains(event.target)
			) {
				props.closeSignIn();
			}
		},
		[props]
	);

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);
		return () => document.removeEventListener('click', handleOutsideClick);
	}, [handleOutsideClick]);

	return (
		<div
			className={[SignIn, setDisplayStyle].join(' ')}
			ref={myRef}
			onClick={event => handleOutsideClick(event)}
		>
			{props.isLoading ? (
				<Spinner />
			) : (
				<>
					<h2>Members Login</h2>
					<form action="post" onSubmit={handleSubmitFormClick}>
						{fields.map((field, i) => (
							<Input
								key={field.data}
								focused={i === 0 && props.isSignInDisplayed}
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
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeSignIn: () => dispatch(signInOutsideCloseClick()),
		sentAuthForm: (email, password, isSignIn) =>
			dispatch(confirmAuth(email, password, isSignIn)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignIn);
