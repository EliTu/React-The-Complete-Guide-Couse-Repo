import React, { Component } from 'react';
import authForm from './authForm/authForm';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import styles from './Authentication.module.css';
import * as helpers from './helpers';

export class Authentication extends Component {
	state = {
		fields: authForm,
		isFormValid: false,
	};

	handleFormChange = (event, data) => {
		let updatedForm = [...this.state.fields];
		let updatedFormData = updatedForm.forEach(el =>
			el.data === data
				? ((el.value = event.target.value),
				  (el.validation.valid = this.checkInputValidation(
						el.value,
						el.validation,
						el.data
				  )),
				  (el.validation.hasUserInput = true))
				: el
		);
		updatedForm.value = updatedFormData;

		this.setState({
			fields: updatedForm,
		});
	};

	checkFormValidation = () => {
		const formCopy = [...this.state.fields];
		const checkValid = formCopy.every(el => el.validation.valid);

		this.setState({
			isFormValid: checkValid,
		});
	};

	checkInputValidation = (value, validation, type) => {
		let isValid = true;

		// General validation & empty field:
		if (validation.required) isValid = value.trim() !== '' && isValid;

		// Check min characters:
		if (validation.minLength && validation.maxLength)
			isValid =
				value.length >= validation.minLength &&
				value.length <= validation.maxLength &&
				isValid;

		// Check the email regex:
		if (validation.required && type === 'email')
			isValid = validation.emailValidationRegExp.test(value);

		this.checkFormValidation();
		return isValid;
	};

	render() {
		// state:
		const { fields } = this.state;

		// Styles:
		const { Authentication, MainHeader } = styles;

		return (
			<>
				<h1 className={MainHeader}>Registration</h1>
				<div className={Authentication}>
					<h2>Become a new member!</h2>
					<form action="post" onSubmit>
						{fields.map(field => (
							<Input
								key={field.data}
								elementType={field.elementType}
								elementConfig={field.elementConfig}
								validation={{ ...field.validation }}
								value={field.value}
								handleChange={event =>
									this.handleFormChange(event, field.data)
								}
							/>
						))}
					</form>
					<Button type="Confirm">Sign up</Button>
					<Button type="Danger">Go back</Button>
				</div>
			</>
		);
	}
}

export default Authentication;
