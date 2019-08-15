import React, { useState, useEffect, useReducer } from 'react';
import Notification from './Notification/Notification';
import usePreviousValue from '../../../utilities/custom-hooks/usePreviousValue';
import { connect } from 'react-redux';
import styles from './NotificationBox.module.css';
import PropTypes from 'prop-types';

const NotificationBox = ({
	isLoggedIn,
	isSignInLoading,
	authType,
	isErrorOnMount,
	orders,
	areOrdersLoading,
	idToken,
	userId,
}) => {
	// CSS Modules styles:
	const { NotificationBox, Open, Closed } = styles;

	// Local state hooks:
	const [isDisplayed, setIsDisplayed] = useState(false);

	// Prev state values:
	const prevToken = usePreviousValue(idToken);
	const prevUserId = usePreviousValue(userId);
	const prevSignInStatus = usePreviousValue(isLoggedIn);

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
			default:
				return '';
		}
	};
	const [notificationData, dispatch] = useReducer(notificationReducer, {
		message: '',
		sign: '',
	});

	const displayStatus = isDisplayed ? Open : Closed;

	useEffect(() => {
		const messageType =
			prevToken && prevUserId && prevSignInStatus
				? 'LOGIN_SUCCESS'
				: !prevToken && !prevUserId && authType === 'signOut'
				? 'LOGOUT'
				: isErrorOnMount
				? 'ERROR_ON_MOUNT'
				: '';
		console.log(messageType);
		setIsDisplayed(true);
		dispatch({ type: messageType });

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

	return (
		<>
			{notificationData && (
				<div
					className={[NotificationBox, displayStatus].join(' ')}
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
	areOrdersAvailable: PropTypes.bool,
	isSignInLoading: PropTypes.bool,
	orders: PropTypes.array,
	userId: PropTypes.string,
	idToken: PropTypes.string,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isSignInLoading: state.auth.isSignInLoading,
		isLoggedIn: state.auth.isLoggedIn,
		authType: state.auth.authType,
		isErrorOnMount: state.burgerBuilder.isErrorOnMount,
		orders: state.orderForm.orders,
		areOrdersLoading: state.orderForm.isLoading,
		idToken: state.auth.idToken,
		userId: state.auth.userId,
	};
};

export default connect(mapStateToProps)(NotificationBox);
