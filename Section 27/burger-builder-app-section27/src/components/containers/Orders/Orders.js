import React, { useState, memo, useEffect } from 'react';
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
	const [sortByControls, setSortByControls] = useState(ordersControlForm[0]);
	const [searchControls, setSearchControls] = useState(ordersControlForm[1]);
	const [displayedOrders, setDisplayedOrders] = useState([]);

	// Fetch orders:
	useEffect(() => {
		onFetchOrders(idToken, userId);
	}, [idToken, onFetchOrders, userId, isLoggedIn]);

	// Handle input change
	const handleSortOrdersChange = event => {
		const controlFormCopy = { ...sortByControls };
		controlFormCopy.value = event.target.value;
		setSortByControls(controlFormCopy);
	};

	// Handle input change
	const handleSearchOrdersChange = event => {
		const controlFormCopy = { ...searchControls };
		controlFormCopy.value = event.target.value;
		setSearchControls(controlFormCopy);
	};

	// Switch statement to return a sorted array of orders by type or sort:
	const setSortedOrders = (type, arr) => {
		switch (type) {
			case 'NEWEST':
				return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
			case 'OLDEST':
				return arr.sort((a, b) => new Date(a.date) - new Date(b.date));
			case 'PRICE':
				return arr.sort((a, b) => b.price - a.price);
			case 'DELIVERY':
				return arr.sort((a, b) =>
					a.deliveryMethod.localeCompare(b.deliveryMethod)
				);
			default:
				return arr;
		}
	};
	const sortedOrders = setSortedOrders(sortByControls.value, orders);
	console.log(sortedOrders);

	// Set the sorted array as the array to be rendered to the UI:
	useEffect(() => {
		setDisplayedOrders(sortedOrders);
	}, [sortedOrders]);

	console.log(displayedOrders);
	console.log(sortByControls.value);

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
					elementType={sortByControls.elementType}
					elementConfig={{ ...sortByControls.elementConfig }}
					value={sortByControls.value}
					key={sortByControls.data}
					validation={{ ...sortByControls.validation }}
					handleChange={event => handleSortOrdersChange(event)}
				/>
				<Input
					elementType={searchControls.elementType}
					elementConfig={{ ...searchControls.elementConfig }}
					value={searchControls.value}
					key={searchControls.data}
					validation={{ ...searchControls.validation }}
					handleChange={event => handleSearchOrdersChange(event)}
				/>
				{isLoadingRequest ? (
					<Spinner />
				) : !isLoadingRequest && orders.length > 0 && isLoggedIn ? (
					displayedOrders.map(order => {
						return (
							order.id &&
							order.ingredients &&
							order.price && (
								<OrderCard
									key={order.id}
									orderId={order.id}
									date={order.date}
									ingredients={order.ingredients}
									contact={order.customer}
									delivery={order.deliveryMethod}
									price={order.price.toFixed(2)}
								/>
							)
						);
					})
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
