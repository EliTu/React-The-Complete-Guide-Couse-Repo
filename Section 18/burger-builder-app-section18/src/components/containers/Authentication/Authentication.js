import React, { Component } from 'react';
import { connect } from 'react-redux';
import authForm from './authForm/authForm';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import FormErrorMessage from '../../UI/FormErrorMessage/FormErrorMessage';
import styles from './Authentication.module.css';
import { confirmAuth } from './store/actions';
// import * as helpers from './helpers';

export class Authentication extends Component {
	state = {
		fields: authForm,
		isFormValid: false,
		showFormInvalidMessage: false,
		formErrorType: 'emptyFields',
		checkMinMax: false,
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.checkMinMax !== this.state.checkMinMax) {
			this.checkFormValidation();
		}
	}

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
		const checkValid = formCopy.every(el => {
			return el.validation.valid;
		});

		this.setState({
			isFormValid: checkValid,
		});
	};

	checkInputValidation = (value, validation, type) => {
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

		this.setState({
			checkMinMax: isValid,
		});

		return isValid;
	};

	handleSubmitFormClick = event => {
		event.preventDefault();

		if (!this.state.isFormValid) {
			this.setState({
				showFormInvalidMessage: true,
				formErrorType: 'emptyFields',
			});
			return;
		}

		// Check if both passwords are not matching
		if (this.state.fields[1].value !== this.state.fields[2].value) {
			// Nullify 2nd password field
			let resetValueCopy = [...this.state.fields];
			resetValueCopy[2].value = '';

			this.setState({
				fields: resetValueCopy,
				isFormValid: false,
				showFormInvalidMessage: true,
				formErrorType: 'noMatch',
			});
			return;
		}

		if (this.state.isFormValid) {
			this.props.sentAuthForm(
				this.state.fields[0].value,
				this.state.fields[1].value
			);
			this.setState({
				showFormInvalidMessage: false,
			});
		}
	};

	handleCancelClick = () => {
		return this.props.history.replace('/');
	};

	render() {
		// state:
		const { fields, showFormInvalidMessage, formErrorType } = this.state;

		// Styles:
		const { Authentication, MainHeader } = styles;

		return (
			<>
				<h1 className={MainHeader}>Registration</h1>
				<div className={Authentication}>
					<h2>Become a new member!</h2>
					<form action="post" onSubmit={this.handleSubmitFormClick}>
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
					{showFormInvalidMessage ? (
						<FormErrorMessage errorType={formErrorType} />
					) : null}
					<Button
						type="Confirm"
						handleClick={this.handleSubmitFormClick}
					>
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
		sentAuthForm: (email, password) =>
			dispatch(confirmAuth(email, password)),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Authentication);
