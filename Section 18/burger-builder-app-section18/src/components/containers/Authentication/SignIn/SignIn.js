import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import signInForm from './signInForm/signInForm';
import { signInOutsideCloseClick } from '../../../display/Navigation/AuthItems/store/actions';
import styles from './SignIn.module.css';

const SignIn = props => {
	const { SignIn, Open, Closed } = styles;

	// State hooks:
	const [fields, setFields] = useState(signInForm);
	const [isFormValid, setIsFormValid] = useState(false);
	const [showFormInvalidMessage, setShowFormInvalidMessage] = useState(false);
	const [checkMinMax, setCheckMinMax] = useState(false);

	// Toggle component display upon clicking the navbar link
	const setDisplayStyle = props.isSignInDisplayed ? Open : Closed;

	const checkFormValidation = () => {
		const formCopy = [...fields];
		const checkValid = formCopy.every(el => {
			return el.validation.valid;
		});

		setIsFormValid(checkValid);
	};

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

	// Handle clicks on outside of the component to close it
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
			<h2>Members Login</h2>
			<form action="post">
				{fields.map(field => (
					<Input
						key={field.data}
						elementType={field.elementType}
						elementConfig={field.elementConfig}
						validation={{ ...field.validation }}
						value={field.value}
						handleChange={event =>
							handleFormChange(event, field.data)
						}
					/>
				))}
			</form>
			<Button type="Confirm" handleClick>
				Login
			</Button>
		</div>
	);
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isSignInDisplayed: state.signIn.isSignInDisplayed,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeSignIn: () => dispatch(signInOutsideCloseClick()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignIn);
