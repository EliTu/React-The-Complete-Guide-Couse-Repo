import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import styles from './CheckoutSummary.module.css';
import PropTypes from 'prop-types';

const CheckoutSummary = props => {
	// props:
	const { ingredients, cancelClick, checkoutClick } = props;

	// CSS Modules styles
	const { CheckoutSummary, BurgerDisplay } = styles;

	return (
		<div className={CheckoutSummary}>
			<h1>Your burger:</h1>
			<div className={BurgerDisplay}>
				<Burger ingredients={ingredients} />
			</div>
			<Button handleClick={checkoutClick} type="Confirm">
				Place Order
			</Button>
			<Button handleClick={cancelClick} type="Danger">
				Cancel
			</Button>
		</div>
	);
};

export default CheckoutSummary;
