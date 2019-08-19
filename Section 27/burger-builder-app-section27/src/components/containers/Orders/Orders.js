import React, { useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import OrderCard from './OrderCard/OrderCard';
import OrderPaginationPanel from './OrdersPaginationPanel/OrdersPaginationPanel';
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
	// CSS Modules styles:
	const { Orders, OrdersContainer, ControlsContainer } = styles;

	// Local state hooks:
	const [sortByControls, setSortByControls] = useState(ordersControlForm[0]);
	const [searchControls, setSearchControls] = useState(ordersControlForm[1]);
	const [ordersPerPage, setOrdersPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPageNumbers, setTotalPageNumbers] = useState([]);
	const [displayedOrders, setDisplayedOrders] = useState([]);

	// Fetch orders:
	useEffect(() => {
		onFetchOrders(idToken, userId);
	}, [idToken, onFetchOrders, userId, isLoggedIn]);

	// Handle select input change:
	const handleSortOrdersChange = event => {
		const controlFormCopy = { ...sortByControls };
		controlFormCopy.value = event.target.value;
		setSortByControls(controlFormCopy);
	};

	// Handle search input change:
	const handleSearchOrdersChange = event => {
		const controlFormCopy = { ...searchControls };
		controlFormCopy.value = event.target.value;
		setSearchControls(controlFormCopy);
	};

	// Handle clicking on a specific page number:
	const handlePageNumberClick = event =>
		setCurrentPage(Number(event.target.id));

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

	// Set the sorted array as the array to be rendered to the UI:
	useEffect(() => {
		setDisplayedOrders(sortedOrders);
	}, [orders, sortByControls.value, sortedOrders]);

	// Search the orders array for matches with the value of the search input field:
	useEffect(() => {
		const matchSearchResults = (matchValue, orders) => {
			const regex = new RegExp(matchValue, 'gi');
			return orders.filter(el => el.id.match(regex));
		};
		const matchedOrders = matchSearchResults(searchControls.value, orders);

		setDisplayedOrders(matchedOrders);
	}, [orders, searchControls.value]);

	useEffect(() => {
		const setPaginationOrdersDisplay = () => {
			const lastOrderIndex = currentPage * ordersPerPage;
			const firstOrderIndex = lastOrderIndex - ordersPerPage;

			setDisplayedOrders(orders.slice(firstOrderIndex, lastOrderIndex));
		};
		setPaginationOrdersDisplay();

		const setPageNumbers = () => {
			let numbersArr = [];
			for (
				let i = 0;
				i <= Math.ceil(displayedOrders.length / ordersPerPage);
				i++
			) {
				numbersArr.push(i + 1);
				setTotalPageNumbers(numbersArr);
			}
		};
		setPageNumbers();
	}, [currentPage, displayedOrders.length, orders, ordersPerPage]);

	// If no orders are available and/or user is signed out:
	const noOrdersMessage =
		!isLoggedIn && !isLoadingRequest
			? `The Orders area is for members only! in order to review your previous orders, please sign in as a member first`
			: `No previous orders found.`;

	return (
		<div className={Orders}>
			<h1>Your orders:</h1>
			{isLoadingRequest ? (
				<Spinner />
			) : !isLoadingRequest && orders.length > 0 && isLoggedIn ? (
				<>
					<div className={OrdersContainer}>
						<div className={ControlsContainer}>
							<Input
								elementType={sortByControls.elementType}
								elementConfig={{
									...sortByControls.elementConfig,
								}}
								value={sortByControls.value}
								key={sortByControls.data}
								validation={{ ...sortByControls.validation }}
								handleChange={event =>
									handleSortOrdersChange(event)
								}
							/>
							<Input
								data={searchControls.data}
								elementType={searchControls.elementType}
								elementConfig={{
									...searchControls.elementConfig,
								}}
								value={searchControls.value}
								key={searchControls.data}
								validation={{ ...searchControls.validation }}
								handleChange={event =>
									handleSearchOrdersChange(event)
								}
							/>
						</div>
						<OrderPaginationPanel
							pages={totalPageNumbers}
							pageNumberClick={handlePageNumberClick}
						/>
						{displayedOrders.map(
							order =>
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
						)}
					</div>
				</>
			) : (
				<GoBackMessage content={noOrdersMessage} />
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
)(memo(Orders));
