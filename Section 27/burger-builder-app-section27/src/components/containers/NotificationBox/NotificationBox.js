import React, { useState, useEffect, useReducer } from 'react';
import Notification from './Notification/Notification';
import { connect } from 'react-redux';
import styles from './NotificationBox.module.css';
import PropTypes from 'prop-types';

const NotificationBox = ({
	isLoggedIn,
	authType,
	isErrorOnMount,
	isLoadingRequest,
}) => {
	// CSS Modules styles:
	const { NotificationBox, Open, Closed } = styles;

	// Local state hooks:
	const [isDisplayed, setIsDisplayed] = useState(false);

	// Notifications type reducer:
	const notificationReducer = (state = '', action) => {
		switch (action.type) {
			case 'INIT':
				return state;
			case 'LOGIN_SUCCESS':
				return state;
			case 'LOGOUT':
				return state;
			case 'ERROR_ON_MOUNT':
				return state;
			case 'LOADING_ORDERS':
				return state;
			default:
				return state;
		}
	};
	const [notificationType, dispatch] = useReducer(notificationReducer, '');

	const displayStatus = isDisplayed ? Open : Closed;

	useEffect(() => {
		setIsDisplayed(true);
		const autoCloseBox = setTimeout(() => {
			setIsDisplayed(false);
		}, 5000);
		return () => clearTimeout(autoCloseBox);
	}, [isLoggedIn, isErrorOnMount, isLoadingRequest]);

	return (
		<div
			className={[NotificationBox, displayStatus].join(' ')}
			onClick={() => setIsDisplayed(false)}
		>
			<Notification type={notificationType} />
		</div>
	);
};

NotificationBox.propTypes = {
	authType: PropTypes.string,
	isLoggedIn: PropTypes.bool,
	isErrorOnMount: PropTypes.bool,
	isLoadingRequest: PropTypes.bool,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		authType: state.auth.authType,
		isErrorOnMount: state.burgerBuilder.isErrorOnMount,
		isLoadingRequest: state.orderForm.isLoading,
	};
};

export default connect(mapStateToProps)(NotificationBox);
