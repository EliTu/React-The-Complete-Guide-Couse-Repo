import React from 'react';
import Item from '../Item/Item';
import styles from './AuthItems.module.css';

const AuthItems = props => {
	// CSS Modules style:
	const { AuthItems } = styles;
	return (
		<div className={AuthItems}>
			<Item signInItem link="">
				Sign up
			</Item>
			<Item link="/signup">Sign up</Item>
		</div>
	);
};

export default AuthItems;
