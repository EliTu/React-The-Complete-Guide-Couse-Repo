import React from 'react';
import { connect } from 'react-redux';
import styles from './NotificationBox.module.css';

const NotificationBox = () => {
	const { NotificationBox } = styles;
	return (
		<div className={NotificationBox}>
			<p>Test</p>
		</div>
	);
};

export default connect()(NotificationBox);
