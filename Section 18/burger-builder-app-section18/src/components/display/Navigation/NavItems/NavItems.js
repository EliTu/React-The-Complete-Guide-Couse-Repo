import React from 'react';
import Item from '../Item/Item';
import styles from './NavItems.module.css';

const NavItems = props => {
	// CSS Module styles:
	const { NavItems, AuthItem } = styles;

	return (
		<div className={NavItems}>
			<Item link="/">Burger Builder</Item>
			<Item link="/checkout">Checkout</Item>
			<Item link="/orders">Orders</Item>
			<Item link="/about">About</Item>
		</div>
	);
};

export default NavItems;
