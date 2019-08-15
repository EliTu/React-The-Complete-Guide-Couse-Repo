import React, { useState, useEffect, useReducer } from 'react';
import Notification from './Notification/Notification';
import usePreviousValue from '../../../utilities/custom-hooks/usePreviousValue';
import { connect } from 'react-redux';
import styles from './NotificationBox.module.css';
import PropTypes from 'prop-types';

const NotificationBox = ({
	isLoggedIn,
	authType,
	isErrorOnMount,
	orders,
	idToken,
	userId,
	ingredients,
	isBuilding,
	isBurgerPurchaseLoading,
	isOrderSuccessful,
	isFetchSuccessful,
}) => {
	// CSS Modules styles:
	const { NotificationBox, Open, Closed } = styles;

	// Local state hooks:
	const [isDisplayed, setIsDisplayed] = useState(false);

	// Prev state values:
	const prevToken = usePreviousValue(idToken);
	const prevUserId = usePreviousValue(userId);
	const prevSignInStatus = usePreviousValue(isLoggedIn);
	const prevIngredients = usePreviousValue(ingredients);

	// Notifications type reducer:
	const notificationReducer = (state, action) => {
		switch (action.type) {
			case 'INIT':
				return {
					message: 'Welcome to React Burger!',
					sign: 'success',
				};
			case 'LOGIN_SUCCESS':
				return {
					message: `You've successfully logged in`,
					sign: 'success',
				};
			case 'LOGOUT':
				return {
					message: `You've successfully logged out`,
					sign: 'danger',
				};
			case 'ERROR_ON_MOUNT':
				return {
					message: `Oops...could not fetch ingredients`,
					sign: 'danger',
				};
			case 'FETCH_ORDERS':
				console.log(action.type);
				return {
					message: 'Previous Orders are available',
					sign: 'success',
				};
			case 'ORDER_SUCCESS':
				console.log(action.type);
				return {
					message: 'Order received successfully',
					sign: 'success',
				};
			default:
				return '';
		}
	};
	const [notificationData, dispatch] = useReducer(notificationReducer, {
		message: '',
		sign: '',
	});

	// Handle Login/logout messages:
	useEffect(() => {
		const messageType =
			isLoggedIn && authType === 'signin'
				? 'LOGIN_SUCCESS'
				: !prevToken && !prevUserId && authType === 'signOut'
				? 'LOGOUT'
				: isErrorOnMount
				? 'ERROR_ON_MOUNT'
				: '';

		console.log(messageType);
		dispatch({ type: messageType });
		setIsDisplayed(true);

		// Make sure to close the NotificationBox after 5 seconds:
		const autoCloseBox = setTimeout(() => {
			setIsDisplayed(false);
		}, 5000);
		return () => clearTimeout(autoCloseBox);
	}, [
		authType,
		isErrorOnMount,
		isLoggedIn,
		prevSignInStatus,
		prevToken,
		prevUserId,
	]);

	// Display successful order message:

	// Handle order list available message:
	useEffect(() => {
		if (isFetchSuccessful) dispatch({ type: 'FETCH_ORDERS' });
		if (isOrderSuccessful) dispatch({ type: 'ORDER_SUCCESS' });
	}, [isFetchSuccessful, isOrderSuccessful]);

	// Display app init message:
	useEffect(() => {
		if (prevIngredients !== ingredients && !isBuilding)
			dispatch({ type: 'INIT' });
	}, [ingredients, isBuilding, prevIngredients]);

	const displayStatusStyle = isDisplayed ? Open : Closed;

	console.log(notificationData.message);
	return (
		<>
			{notificationData && (
				<div
					className={[NotificationBox, displayStatusStyle].join(' ')}
					onClick={() => setIsDisplayed(false)}
				>
					<Notification
						type={notificationData.message}
						sign={notificationData.sign}
					/>
				</div>
			)}
		</>
	);
};

NotificationBox.propTypes = {
	authType: PropTypes.string,
	isLoggedIn: PropTypes.bool,
	isErrorOnMount: PropTypes.bool,
	orders: PropTypes.array,
	idToken: PropTypes.string,
	userId: PropTypes.string,
	ingredients: PropTypes.array,
	isBuilding: PropTypes.bool,
	isBurgerPurchaseLoading: PropTypes.bool,
	isOrderSuccessful: PropTypes.bool,
	isFetchSuccessful: PropTypes.bool,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		authType: state.auth.authType,
		isErrorOnMount: state.burgerBuilder.isErrorOnMount,
		orders: state.orderForm.orders,
		idToken: state.auth.idToken,
		userId: state.auth.userId,
		ingredients: state.burgerBuilder.ingredients,
		isBuilding: state.burgerBuilder.isBuilding,
		isBurgerPurchaseLoading: state.orderForm.isLoading,
		isOrderSuccessful: state.orderForm.isOrderSuccessful,
		isFetchSuccessful: state.orderForm.isFetchSuccessful,
	};
};

export default connect(mapStateToProps)(NotificationBox);
