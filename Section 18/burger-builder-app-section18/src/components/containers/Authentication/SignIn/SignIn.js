import React, { useState } from 'react';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import signInForm from './signInForm/signInForm';
import styles from './SignIn.module.css';

const SignIn = () => {
	const { SignIn, MainHeader } = styles;
	const [fields, setFields] = useState(signInForm);

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

		setFields();
	};

	return (
		<div className={SignIn}>
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

export default SignIn;
