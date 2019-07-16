import React, { Component } from 'react';
import { connect } from 'react-redux';
import authForm from './authForm/authForm';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import styles from './Authentication.module.css';
import { confirmAuth } from './store/actions';
// import * as helpers from './helpers';

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

	handleSubmitForm = event => {
		event.preventDefault();
		this.props.sentAuthForm(
			this.state.fields[0].value,
			this.state.fields[1].value,
			this.state.fields[2].value
		);
	};

	handleCancelClick = () => {
		return this.props.history.replace('/');
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
					<form action="post" onSubmit={this.handleSubmitForm}>
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
					<Button type="Confirm" handleClick={this.handleSubmitForm}>
						Sign up
					</Button>
					<Button type="Danger" handleClick={this.handleCancelClick}>
						Go back
					</Button>
				</div>
			</>
		);
	}
}

// Redux setup:
const mapDispatchToProps = dispatch => {
	return {
		sentAuthForm: (username, email, password) =>
			dispatch(confirmAuth(username, email, password)),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Authentication);
