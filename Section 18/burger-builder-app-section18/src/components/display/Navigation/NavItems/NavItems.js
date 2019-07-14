import React from 'react';
import Item from './Item/Item';
import styles from './NavItems.module.css';

const NavItems = props => {
	// CSS Module styles:
	const { NavItems, AuthItem } = styles;

	return (
		<ul className={NavItems}>
			<Item link="/">Burger Builder</Item>
			<Item link="/checkout">Checkout</Item>
			<Item link="/orders">Orders</Item>
			<Item link="/about">About</Item>
			<span className={AuthItem}>
				<Item link="/signup">Sign up</Item>
			</span>
		</ul>
	);
};

export default NavItems;
