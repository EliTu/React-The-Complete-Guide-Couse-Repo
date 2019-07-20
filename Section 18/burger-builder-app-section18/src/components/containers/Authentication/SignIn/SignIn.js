import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import signInForm from './signInForm/signInForm';
import styles from './SignIn.module.css';

const SignIn = props => {
	const { SignIn, Open, Closed } = styles;
	const [fields, setFields] = useState(signInForm);

	// Toggle component display upon clicking the navbar link
	const setDisplayStyle = props.isSignInDisplayed ? Open : Closed;

	const handleFormChange = (event, data) => {
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

		setFields(updatedFormData);
	};

	const handleOutsideClick = event => {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			console.log('hi');
		}
	};

	return (
		<div
			className={[SignIn, setDisplayStyle].join(' ')}
			onBlur={event => handleOutsideClick(event)}
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

export default connect(mapStateToProps)(SignIn);
