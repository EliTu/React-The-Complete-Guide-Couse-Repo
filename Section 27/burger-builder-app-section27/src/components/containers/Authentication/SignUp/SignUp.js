import React, { Component } from 'react';
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

export class SignUp extends Component {
	state = {
		fields: signUpFormTemplate,
		isFormValid: false,
		showFormInvalidMessage: false,
		formErrorType: 'emptyFields',
		checkMinMax: false,
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.checkMinMax !== this.state.checkMinMax) {
			this.checkFormValidation();
		}
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
			this.props.isBuilding && this.props.isRedirectedToAuth
				? this.props.history.push('/checkout')
				: this.props.history.push('/');
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
			// Nullify 2nd password field value
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

		// If all fields are valid
		if (this.state.isFormValid) {
			this.props.sentAuthForm(
				this.state.fields[0].value,
				this.state.fields[1].value,
				'signup'
			);

			let resetValueCopy = [...this.state.fields];
			resetValueCopy.forEach(field => (field.value = ''));

			this.setState({
				fields: resetValueCopy,
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

		// props:
		const { isLoading, isSignInLoading, error, authType } = this.props;

		// Styles:
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
							<form
								action="post"
								onSubmit={this.handleSubmitFormClick}
							>
								{fields.map((field, i) => (
									<Input
										key={field.data}
										focused={i === 0}
										elementType={field.elementType}
										elementConfig={field.elementConfig}
										validation={{ ...field.validation }}
										value={field.value}
										handleChange={event =>
											this.handleFormChange(
												event,
												field.data
											)
										}
										handleEnterPress={
											this.handleSubmitFormClick
										}
									/>
								))}
							</form>
							{showFormInvalidMessage ? (
								<FormErrorMessage errorType={formErrorType} />
							) : null}
							{error && authType === 'signup' ? (
								<AuthErrorMessage
									errorMessage={
										error.response.data.error.message
									}
								/>
							) : null}
							<Button
								type="Confirm"
								handleClick={this.handleSubmitFormClick}
							>
								Sign up
							</Button>
							<Button
								type="Danger"
								handleClick={this.handleCancelClick}
							>
								Go back
							</Button>
						</>
					)}
				</div>
			</>
		);
	}
}

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
