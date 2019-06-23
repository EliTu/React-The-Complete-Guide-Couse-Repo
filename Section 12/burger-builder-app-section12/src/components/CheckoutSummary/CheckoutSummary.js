import React from 'react';
import { withRouter } from 'react-router-dom';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import styles from './CheckoutSummary.module.css';
import PropTypes from 'prop-types';

const CheckoutSummary = props => {
	// props:
	const { cancelClick, checkoutClick, location } = props;

	// CSS Modules styles
	const { CheckoutSummary, BurgerDisplay } = styles;

	// Access the passed ingredients through the Router location prop:
	const ingredientsArr = [...location.state];

	return (
		<div className={CheckoutSummary}>
			<h1>Your burger:</h1>
			<div className={BurgerDisplay}>
				<Burger ingredients={ingredientsArr} />
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

export default withRouter(CheckoutSummary);
