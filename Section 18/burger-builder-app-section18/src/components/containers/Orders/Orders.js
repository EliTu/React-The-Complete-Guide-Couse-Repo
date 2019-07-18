import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from './Order/Order';
import Spinner from '../../UI/Spinner/Spinner';
import axiosInstance from '../../../axios/axios-orders';
import { fetchOrdersFromDatabase } from './store/actions';
import requestMessageComponent from '../../requestMessageComponent/requestMessageComponent';
import styles from './Orders.module.css';
import PropTypes from 'prop-types';

export class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders();
	}

	render() {
		// state (mapped from redux):
		const { orders, isLoadingRequest } = this.props;
		// CSS Modules styles:
		const { Orders, noOrders } = styles;

		return (
			<div className={Orders}>
				<h1>Your orders:</h1>
				{isLoadingRequest ? (
					<Spinner />
				) : !isLoadingRequest && orders.length > 0 ? (
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

Orders.propTypes = {
	orders: PropTypes.array,
	isLoadingRequest: PropTypes.bool,
	onFetchOrders: PropTypes.func,
};

// Redux setup:
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
