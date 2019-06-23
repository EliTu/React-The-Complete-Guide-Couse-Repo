import React, { Component } from 'react';
import styles from './ContactData.module.css';
import Button from '../../UI/Button/Button';

export class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
	};

	render() {
		// CSS Modules styles:
		const { ContactData } = styles;

		return (
			<div className={ContactData}>
				<h4>Enter your contact data:</h4>
				<form action="post">
					<input
						type="text"
						name="name"
						placeholder="Enter your name"
					/>
					<input
						type="email"
						name="email"
						placeholder="Enter your email"
					/>
					<input
						type="street"
						name="street"
						placeholder="Enter your street name"
					/>
					<input
						type="postal"
						name="postal"
						placeholder="Enter your postal code number"
					/>
				</form>
				<Button type="Confirm" clickHandler>
					Order
				</Button>
				<Button type="Danger" clickHandler>
					Cancel
				</Button>
			</div>
		);
	}
}

export default ContactData;
