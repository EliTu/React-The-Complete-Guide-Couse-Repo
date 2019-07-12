import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from './Order/Order';
import axiosInstance from '../../../axios-orders';
import { fetchOrdersFromDatabase } from './store/actions';
import requestMessageComponent from '../../requestMessageComponent/requestMessageComponent';
import styles from './Orders.module.css';

export class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders();
	}

	render() {
		// state (mapped from redux):
		const { orders, isLoadingRequest } = this.props;
		// CSS Modules styles:
		const { Orders, noOrders } = styles;

		const areOrdersAvailable = !isLoadingRequest && orders.length > 0;

		return (
			<div className={Orders}>
				<h1>Your orders:</h1>
				{areOrdersAvailable ? (
					orders.map(order => {
						return order.id && order.ingredients && order.price ? (
							<Order
								key={order.id}
								orderId={order.id}
								ingredients={order.ingredients}
								contact={order.customer}
								delivery={order.deliveryMethod}
								price={order.price.toFixed(2)}
							/>
						) : null;
					})
				) : (
					<p className={noOrders}>No previous orders found!</p>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orderForm.orders,
		isLoadingRequest: state.orderForm.isLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: () => dispatch(fetchOrdersFromDatabase()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(requestMessageComponent(Orders, axiosInstance));
