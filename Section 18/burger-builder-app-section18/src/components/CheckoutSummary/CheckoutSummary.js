import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import styles from './CheckoutSummary.module.css';
import PropTypes from 'prop-types';

const CheckoutSummary = ({
	cancelClick,
	checkoutClick,
	ingredients,
	totalPrice,
	isLoggedIn,
	...props
}) => {
	// CSS Modules styles:
	const { CheckoutSummary, BurgerDisplay, NoIngredients, Price } = styles;

	// Check if ingredients were selected in the BurgerBuilder
	const areIngredientsSelected = ingredients
		? ingredients.some(ingredient => ingredient.quantity > 0)
		: null;

	const errorMessage = !isLoggedIn
		? 'Please sign in to checkout an order'
		: 'It seems like no ingredients were selected! Please select burger ingredients in order to checkout';

	return (
		<div className={CheckoutSummary}>
			<div className={BurgerDisplay}>
				{areIngredientsSelected && isLoggedIn ? (
					<>
						<p>
							Total price:
							<span className={Price}>
								${totalPrice.toFixed(2)}
							</span>
						</p>
						<Burger ingredients={ingredients} />
					</>
				) : (
					<>
						<p className={NoIngredients}>{errorMessage}</p>
						<Button handleClick={cancelClick} type="Danger">
							Go back
						</Button>
					</>
				)}
			</div>
			{areIngredientsSelected && isLoggedIn && (
				<>
					<Button handleClick={checkoutClick} type="Confirm">
						Continue
					</Button>
					<Button handleClick={cancelClick} type="Danger">
						Cancel
					</Button>
				</>
			)}
		</div>
	);
};

CheckoutSummary.propTypes = {
	ingredients: PropTypes.array,
	cancelClick: PropTypes.func,
	checkoutClick: PropTypes.func,
	location: PropTypes.object,
	isLoggedIn: PropTypes.bool,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		totalPrice: state.burgerBuilder.totalPrice,
		isLoggedIn: state.auth.isLoggedIn,
	};
};

export default connect(mapStateToProps)(withRouter(CheckoutSummary));
