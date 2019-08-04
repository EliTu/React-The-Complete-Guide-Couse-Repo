import React from 'react';
import { connect } from 'react-redux';
import Item from '../Item/Item';
import styles from './NavItems.module.css';
import PropTypes from 'prop-types';

export const NavItems = ({ isLoggedIn }) => {
	// CSS Module styles:
	const { NavItems } = styles;

	return (
		<div className={NavItems}>
			<Item link="/">Burger Builder</Item>
			{isLoggedIn && <Item link="/checkout">Checkout</Item>}
			<Item link="/orders">Orders</Item>
			<Item link="/about">About</Item>
		</div>
	);
};

NavItems.propTypes = {
	isLoggedIn: PropTypes.bool,
};

// Redux Setup:
const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
	};
};

export default connect(mapStateToProps)(NavItems);
