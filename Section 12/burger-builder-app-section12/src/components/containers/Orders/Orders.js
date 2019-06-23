import React, { Component } from 'react';
import Order from './Order/Order';

export class Orders extends Component {
	render() {
		return (
			<div>
				<h1>Your orders:</h1>
				<Order />
				<Order />
			</div>
		);
	}
}

export default Orders;
