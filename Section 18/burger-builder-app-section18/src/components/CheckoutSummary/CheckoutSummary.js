import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import styles from './CheckoutSummary.module.css';
import PropTypes from 'prop-types';

const CheckoutSummary = props => {
	// props:
	const { cancelClick, checkoutClick, ingredients, totalPrice } = props;

	// CSS Modules styles:
	const { CheckoutSummary, BurgerDisplay, NoIngredients, Price } = styles;

	const areIngredientsSelected = ingredients
		? ingredients.some(ingredient => ingredient.quantity > 0)
		: null;

	return (
		<div className={CheckoutSummary}>
			<div className={BurgerDisplay}>
				{areIngredientsSelected ? (
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
						<p className={NoIngredients}>
							It seems like no ingredients were selected! Please
							select burger ingredients in order to checkout.
						</p>
						<Button handleClick={cancelClick} type="Danger">
							Go back
						</Button>
					</>
				)}
			</div>
			{areIngredientsSelected && (
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
};

// Redux setup:
const mapStateToProps = state => {
	return {
		totalPrice: state.burgerBuilder.totalPrice,
	};
};

export default connect(mapStateToProps)(withRouter(CheckoutSummary));
