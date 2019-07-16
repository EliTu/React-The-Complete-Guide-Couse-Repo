import React from 'react';
import Item from '../Item/Item';
import styles from './AuthItems.module.css';

const AuthItems = props => {
	const { AuthItems } = styles;
	return (
		<div className={AuthItems}>
			<Item link="/signup">Sign up</Item>
		</div>
	);
};

export default AuthItems;
