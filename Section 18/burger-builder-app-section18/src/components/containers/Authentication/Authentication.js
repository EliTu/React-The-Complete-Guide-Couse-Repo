import React, { Component } from 'react';
import authForm from './authForm/authForm';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

export class Authentication extends Component {
	state = {
		fields: authForm,
	};

	render() {
		// state:
		const { fields } = this.state;

		// Styles:
		const { Authentication } = styles;
		return (
			<div>
				<form action="post" onSubmit>
					{fields.map(field => (
						<Input
							key={field.data}
							elementType={field.elementType}
							elementConfig={field.elementConfig}
							validation={{ ...field.validation }}
							value={field.value}
							handleChange
						/>
					))}
				</form>
				<Button type="Confirm">Sign up</Button>
				<Button type="Danger">Cancel</Button>
			</div>
		);
	}
}

export default Authentication;
