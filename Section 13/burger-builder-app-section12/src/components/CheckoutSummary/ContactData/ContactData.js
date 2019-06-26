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

	handleOrderSubmitClick = async event => {
		event.preventDefault();

		this.setState({ isLoadingRequest: true });
		const orderData = [...this.state.orderForm];
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: orderData[0].value,
				phone: orderData[1].value,
				email: orderData[2].value,
				address: orderData[3].value,
				postal: orderData[4].value,
			},
			deliveryMethod: orderData[5].value,
		};
		console.log(order);
		try {
			const postRequest = await axiosInstance.post('/orders.json', order);
			console.log(postRequest);
			this.setState({ isLoadingRequest: false });
			this.props.history.push('/orders');
		} catch (error) {
			this.setState({ isLoadingRequest: false });
		}
	};

	handleFormChange = (event, data) => {
		let updatedForm = [...this.state.orderForm];
		let updatedValue = updatedForm.forEach(el =>
			el.data === data ? (el.value = event.target.value) : el
		);
		updatedForm.value = updatedValue;

		this.setState({
			orderForm: updatedForm,
		});
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
					<form action="post" onSubmit={this.handleOrderSubmitClick}>
						{orderForm.map(form => (
							<Input
								key={form.data}
								elementType={form.elementType}
								elementConfig={form.elementConfig}
								value={form.value}
								handleChange={event =>
									this.handleFormChange(event, form.data)
								}
							/>
						))}
					</form>
				)}
				<Button
					type="Confirm"
					handleClick={this.handleOrderSubmitClick}
				>
					Confirm Order
				</Button>
			</div>
		);
	}
}

export default ContactData;
