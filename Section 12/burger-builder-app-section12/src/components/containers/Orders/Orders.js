import React, { Component } from 'react';
import CheckoutSummary from '../../CheckoutSummary/CheckoutSummary';
import styles from './Orders.module.css';

export class Orders extends Component {
	state = {
		ingredients: [
			{ ingredient: 'meat', quantity: 1 },
			{ ingredient: 'cheese', quantity: 1 },
			{ ingredient: 'salad', quantity: 1 },
			{ ingredient: 'bacon', quantity: 1 },
		],
	};

	handleCancelClick = () => {
		this.props.history.goBack();
	};

	handleCheckoutClick = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		// CSS Modules styles:
		const { Checkout } = styles;

		// state:
		const { ingredients } = this.state;

		return (
			<div className={Checkout}>
				<h1>This is the orders page</h1>
				<CheckoutSummary
					ingredients={ingredients}
					cancelClick={this.handleCancelClick}
					checkoutClick={this.handleCheckoutClick}
				/>
			</div>
		);
	}
}

export default Orders;
