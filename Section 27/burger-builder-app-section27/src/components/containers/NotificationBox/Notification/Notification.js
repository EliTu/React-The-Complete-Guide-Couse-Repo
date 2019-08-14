import React from 'react';
import Icon from '../../../UI/Icon/Icon';
import styles from './Notification.module.css';
import {
	faCheckCircle,
	faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

const Notification = ({ type, sign }) => {
	const { Notification, Success, Fail } = styles;
	return (
		<>
			{type && (
				<div className={Notification}>
					<p>{type}</p>
					<Icon
						iconType={
							sign === 'success'
								? faCheckCircle
								: faExclamationCircle
						}
						size="3x"
					/>
				</div>
			)}
		</>
	);
};

export default Notification;
