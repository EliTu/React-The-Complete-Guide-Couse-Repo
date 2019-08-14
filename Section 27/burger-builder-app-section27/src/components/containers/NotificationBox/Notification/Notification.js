import React from 'react';
import Icon from '../../../UI/Icon/Icon';
import styles from './Notification.module.css';
import {
	faCheckCircle,
	faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

const Notification = () => {
	const { Notification, Success, Fail } = styles;
	return (
		<div className={Notification}>
			<p>Test</p>
			<Icon iconType={faExclamationCircle} size="3x" className={Fail} />
		</div>
	);
};

export default Notification;
