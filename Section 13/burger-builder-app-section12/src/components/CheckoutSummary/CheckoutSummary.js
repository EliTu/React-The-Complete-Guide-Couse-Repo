import React from 'react';
import { withRouter } from 'react-router-dom';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import styles from './CheckoutSummary.module.css';
import PropTypes from 'prop-types';

const CheckoutSummary = props => {
	// props:
	const { cancelClick, checkoutClick, ingredients } = props;

	// CSS Modules styles:
	const { CheckoutSummary, BurgerDisplay, NoIngredients } = styles;

	return (
		<div className={CheckoutSummary}>
			<h1>Your burger:</h1>
			<div className={BurgerDisplay}>
				{ingredients ? (
					<Burger ingredients={ingredients} />
				) : (
					<p className={NoIngredients}>
						It seems like no ingredients were selected! Please
						select burger ingredients in order to checkout.
					</p>
				)}
			</div>
			<Button handleClick={checkoutClick} type="Confirm">
				Continue
			</Button>
			<Button handleClick={cancelClick} type="Danger">
				Cancel
			</Button>
		</div>
	);
};

CheckoutSummary.propTypes = {
	ingredients: PropTypes.array,
	cancelClick: PropTypes.func,
	checkoutClick: PropTypes.func,
	location: PropTypes.object,
};

export default withRouter(CheckoutSummary);

// {
// 	ingredients && (
// 		<>
// 			<Button handleClick={checkoutClick} type="Confirm">
// 				Continue
// 					</Button>
// 			<Button handleClick={cancelClick} type="Danger">
// 				Cancel
// 					</Button>
// 		</>
// 	)
// }
