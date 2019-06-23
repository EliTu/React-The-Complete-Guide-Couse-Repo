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
	const { CheckoutSummary, BurgerDisplay, NoIngredients } = styles;

	// Access the passed ingredients through the Router location prop:
	const ingredientsArr = location.state ? [...location.state] : null;

	return (
		<div className={CheckoutSummary}>
			<h1>Your burger:</h1>
			<div className={BurgerDisplay}>
				{ingredientsArr ? (
					<Burger ingredients={ingredientsArr} />
				) : (
					<p className={NoIngredients}>
						It seems like no ingredients were selected! Please
						select burger ingredients and then checkout the order.
					</p>
				)}
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

CheckoutSummary.propTypes = {
	cancelClick: PropTypes.func,
	checkoutClick: PropTypes.func,
	location: PropTypes.object,
};

export default withRouter(CheckoutSummary);
