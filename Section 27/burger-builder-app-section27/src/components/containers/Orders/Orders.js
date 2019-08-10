import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from './Order/Order';
import Spinner from '../../UI/Spinner/Spinner';
import { fetchOrdersFromDatabase } from './store/actions';
import styles from './Orders.module.css';
import PropTypes from 'prop-types';

export const Orders = ({
	orders,
	isLoadingRequest,
	isLoggedIn,
	idToken,
	userId,
	onFetchOrders,
}) => {
	useEffect(() => {
		onFetchOrders(idToken, userId);
	}, [idToken, onFetchOrders, userId, isLoggedIn]);

	// CSS Modules styles:
	const { Orders, noOrders } = styles;

	const noOrdersMessage =
		!isLoggedIn && !isLoadingRequest
			? `The Orders area is for members only! in order to review your previous orders, please sign in as a member first`
			: `No previous orders found!`;

	return (
		<div className={Orders}>
			<h1>Your orders:</h1>
			{isLoadingRequest ? (
				<Spinner />
			) : !isLoadingRequest && orders.length > 0 && isLoggedIn ? (
				orders
					.map(order => {
						return order.id && order.ingredients && order.price ? (
							<Order
								key={order.id}
								orderId={order.id}
								date={order.date}
								ingredients={order.ingredients}
								contact={order.customer}
								delivery={order.deliveryMethod}
								price={order.price.toFixed(2)}
							/>
						) : null;
					})
					.reverse() // To render the latest order first
			) : (
				<p className={noOrders}>{noOrdersMessage}</p>
			)}
		</div>
	);
};

Orders.propTypes = {
	orders: PropTypes.array,
	isLoadingRequest: PropTypes.bool,
	onFetchOrders: PropTypes.func,
	isLoggedIn: PropTypes.bool,
	idToken: PropTypes.string,
	userId: PropTypes.string,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		orders: state.orderForm.orders,
		isLoadingRequest: state.orderForm.isLoading,
		isLoggedIn: state.auth.isLoggedIn,
		idToken: state.auth.idToken,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (idToken, userId) =>
			dispatch(fetchOrdersFromDatabase(idToken, userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Orders);
