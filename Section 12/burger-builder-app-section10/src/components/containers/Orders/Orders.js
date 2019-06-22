import React, { Component } from 'react';
// import OrderSummery from '../../Burger/OrderSummary/OrderSummary';
import styles from './Orders.module.css';

export class Orders extends Component {
	render() {
		// CSS Modules styles:
		const { Checkout } = styles;

		return (
			<div className={Checkout}>
				<h1>This is the orders page</h1>
			</div>
		);
	}
}

export default Orders;
