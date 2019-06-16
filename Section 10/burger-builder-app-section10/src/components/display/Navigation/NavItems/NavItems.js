import React from 'react';
import Item from './Item/Item';
import styles from './NavItems.module.css';

const NavItems = props => {
	// CSS Module styles:
	const { NavItems } = styles;

	return (
		<ul className={NavItems}>
			<Item active link="/">
				Burger Builder
			</Item>
			<Item link="/">Checkout</Item>
			<Item link="/">About</Item>
		</ul>
	);
};

export default NavItems;
