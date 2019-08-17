import React, { useState, memo, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import OrderCard from './OrderCard/OrderCard';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import GoBackMessage from '../../UI/GoBackMessage/GoBackMessage';
import ordersControlForm from './ordersControlForm/ordersControlForm';
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
	// Local state hooks:
	const [
		{ data, elementType, elementConfig, value, validation },
		setControlsTemplate,
	] = useState(ordersControlForm);

	// Fetch orders:
	useEffect(() => {
		onFetchOrders(idToken, userId);
	}, [idToken, onFetchOrders, userId, isLoggedIn]);

	// Handle input change
	const handleSortOrdersChange = event => {
		const controlFormCopy = {
			data,
			elementType,
			elementConfig,
			value,
			validation,
		};
		controlFormCopy.value = event.target.value;
		setControlsTemplate(controlFormCopy);
	};

	console.log(value);

	// CSS Modules styles:
	const { Orders, OrdersContainer } = styles;

	const noOrdersMessage =
		!isLoggedIn && !isLoadingRequest
			? `The Orders area is for members only! in order to review your previous orders, please sign in as a member first`
			: `No previous orders found.`;

	return (
		<div className={Orders}>
			<h1>Your orders:</h1>
			<div className={OrdersContainer}>
				<Input
					elementType={elementType}
					elementConfig={{ ...elementConfig }}
					value={value}
					key={data}
					validation={{ ...validation }}
					handleChange={event => handleSortOrdersChange(event)}
				/>
				{isLoadingRequest ? (
					<Spinner />
				) : !isLoadingRequest && orders.length > 0 && isLoggedIn ? (
					orders
						.map(order => {
							return order.id &&
								order.ingredients &&
								order.price ? (
								<OrderCard
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
					<GoBackMessage content={noOrdersMessage} />
				)}
			</div>
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
)(memo(Orders));
