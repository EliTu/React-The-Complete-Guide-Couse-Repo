import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import axiosInstance from '../../../axios-orders';
import styles from './ContactData.module.css';

export class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		isLoadingRequest: false,
		ingredients: this.props.ingredients,
		totalPrice: this.props.price,
	};

	handleOrderConfirmClick = async event => {
		event.preventDefault();
		console.log(this.props.ingredients);

		this.setState({ isLoadingRequest: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Eliad',
				address: {
					street: 'Test 1',
					zipCode: '12345',
					city: 'Taipei',
				},
				email: 'text@testmail.com',
			},
			deliveryMethod: 'fastest',
		};
		try {
			const postRequest = await axiosInstance.post('/orders.json', order);
			console.log(postRequest);
			this.setState({ isLoadingRequest: false });
			this.props.history.push('/');
		} catch (error) {
			this.setState({ isLoadingRequest: false });
		}
	};

	render() {
		// state:
		const { isLoadingRequest } = this.state;
		// CSS Modules styles:
		const { ContactData } = styles;

		return (
			<div className={ContactData}>
				<h4>Enter your contact data:</h4>
				{isLoadingRequest ? (
					<Spinner />
				) : (
					<form action="post">
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							name="name"
							placeholder="Enter your name"
						/>
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
						/>
						<label htmlFor="address">Address:</label>
						<input
							type="address"
							name="address"
							placeholder="Enter your address"
						/>
						<label htmlFor="postal">Postal number:</label>
						<input
							type="postal"
							name="postal"
							placeholder="Enter your postal code number"
						/>
					</form>
				)}
				<Button
					type="Confirm"
					handleClick={this.handleOrderConfirmClick}
				>
					Confirm Order
				</Button>
			</div>
		);
	}
}

export default ContactData;
