import React, { Component } from 'react';
import Order from './Order/Order';
import axiosInstance from '../../../axios-orders';
import requestMessageComponent from '../../requestMessageComponent/requestMessageComponent';
import styles from './Orders.module.css';

export class Orders extends Component {
	state = {
		orders: null,
		loading: true,
	};

	async componentDidMount() {
		try {
			// Get the orders from the database:
			const orders = await axiosInstance.get('/orders.json');

			// Create an array from the object received:
			const fetchedOrders = [];
			for (let key in orders.data) {
				fetchedOrders.push({ ...orders.data[key], id: key });
			}
			this.setState({
				orders: fetchedOrders,
				loading: false,
			});
		} catch (error) {
			console.log(error);
			this.setState({
				loading: false,
			});
		}
	}

	render() {
		// state:
		const { orders } = this.state;

		// CSS Modules styles:
		const { Orders } = styles;

		return (
			<div className={Orders}>
				<h1>Your orders:</h1>
				{orders
					? orders.map(order => {
							return order.id &&
								order.ingredients &&
								order.price ? (
								<Order
									key={order.id}
									orderId={order.id}
									ingredients={order.ingredients}
									price={order.price.toFixed(2)}
								/>
							) : null;
					  })
					: null}
			</div>
		);
	}
}

export default requestMessageComponent(Orders, axiosInstance);
