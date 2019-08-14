import React, { useState, useEffect, useReducer } from 'react';
import Notification from './Notification/Notification';
import { connect } from 'react-redux';
import styles from './NotificationBox.module.css';
import PropTypes from 'prop-types';

const NotificationBox = ({
	isLoggedIn,
	authType,
	isErrorOnMount,
	isLoadingOrders,
}) => {
	// CSS Modules styles:
	const { NotificationBox, Open, Closed } = styles;

	// Local state hooks:
	const [isDisplayed, setIsDisplayed] = useState(false);

	// Notifications type reducer:
	const notificationReducer = (state, action) => {
		switch (action.type) {
			case 'INIT':
				return { type: 'Welcome to React Burger!', sign: 'success' };
			case 'LOGIN_SUCCESS':
				return {
					type: `You've successfully logged in`,
					sign: 'success',
				};
			case 'LOGOUT':
				return {
					type: `You've successfully logged out`,
					sign: 'danger',
				};
			case 'ERROR_ON_MOUNT':
				return {
					type: `Oops...could not fetch ingredients`,
					sign: 'danger',
				};
			case 'LOADING_ORDERS':
				return state;
			default:
				return state;
		}
	};
	const [notificationData, dispatch] = useReducer(notificationReducer, {
		type: '',
		sign: '',
	});

	const displayStatus = isDisplayed ? Open : Closed;

	useEffect(() => {
		setIsDisplayed(false);
		dispatch({ type: 'INIT' });
		setIsDisplayed(true);
		if (authType === 'signin' && isLoggedIn)
			dispatch({ type: 'LOGIN_SUCCESS' });
		if (authType === 'signOut' && !isLoggedIn) dispatch({ type: 'LOGOUT' });
		if (isErrorOnMount) dispatch({ type: 'ERROR_ON_MOUNT' });
		dispatch({ type: 'LOGIN_SUCCESS' });
		if (authType === 'signin' && isLoggedIn)
			dispatch({ type: 'LOGIN_SUCCESS' });

		const autoCloseBox = setTimeout(() => {
			setIsDisplayed(false);
		}, 5000);

		return () => clearTimeout(autoCloseBox);
	}, [isLoggedIn, isErrorOnMount, isLoadingOrders, authType]);

	return (
		<div
			className={[NotificationBox, displayStatus].join(' ')}
			onClick={() => setIsDisplayed(false)}
		>
			<Notification
				type={notificationData.type}
				sign={notificationData.sign}
			/>
		</div>
	);
};

NotificationBox.propTypes = {
	authType: PropTypes.string,
	isLoggedIn: PropTypes.bool,
	isErrorOnMount: PropTypes.bool,
	isLoadingOrders: PropTypes.bool,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		authType: state.auth.authType,
		isErrorOnMount: state.burgerBuilder.isErrorOnMount,
		isLoadingOrders: state.orderForm.isLoading,
	};
};

export default connect(mapStateToProps)(NotificationBox);
