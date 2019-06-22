import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import styles from './CheckoutSummary.module.css';
import PropTypes from 'prop-types';

const CheckoutSummary = props => {
	// CSS Modules styles
	const { CheckoutSummary, BurgerDisplay } = styles;

	// props:
	const { ingredients } = props;

	return (
		<div className={CheckoutSummary}>
			<h1>Your burger:</h1>
			<div className={BurgerDisplay}>
				<Burger ingredients={ingredients} />
			</div>
			<Button handleClick type="Confirm">
				Place Order
			</Button>
			<Button handleClick type="Danger">
				Cancel
			</Button>
		</div>
	);
};

export default CheckoutSummary;
