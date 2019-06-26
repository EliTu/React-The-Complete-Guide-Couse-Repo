import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import OrderFormData from './OrderFormData/OrderFormData';
import axiosInstance from '../../../axios-orders';
import styles from './ContactData.module.css';

export class ContactData extends Component {
	state = {
		orderForm: OrderFormData,
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
			this.props.history.push('/orders');
		} catch (error) {
			this.setState({ isLoadingRequest: false });
		}
	};

	render() {
		// state:
		const { isLoadingRequest, orderForm } = this.state;
		// CSS Modules styles:
		const { ContactData } = styles;

		console.log(orderForm);

		return (
			<div className={ContactData}>
				<h4>Enter your contact data:</h4>
				{isLoadingRequest ? (
					<Spinner />
				) : (
					<form action="post">
						<Input
							elementType={ContactData.elementType}
							elementConfig
							value
						/>
						<Input
							label="Email:"
							inputtype="email"
							type="email"
							name="email"
							placeholder="Enter your email"
						/>
						<Input
							label="Address:"
							inputtype="text"
							type="text"
							name="address"
							placeholder="Enter your address"
						/>
						<Input
							label="Postal Code:"
							inputtype="text"
							type="text"
							name="postal"
							placeholder="Enter your postal code"
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
