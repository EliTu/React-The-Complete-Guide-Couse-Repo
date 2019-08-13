import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import GoBackMessage from '../UI/GoBackMessage/GoBackMessage';
import { areIngredientsSelected } from '../../utilities/helpers/helpers';
import styles from './CheckoutSummary.module.css';
import PropTypes from 'prop-types';

const CheckoutSummary = ({
	cancelClick,
	checkoutClick,
	ingredients,
	totalPrice,
	isLoggedIn,
}) => {
	// CSS Modules styles:
	const { CheckoutSummary, BurgerDisplay, Price } = styles;

	const areIngredientsAvailable = areIngredientsSelected(ingredients);

	const message =
		'It seems like no ingredients were selected! Please select burger ingredients in order to checkout';

	return (
		<div className={CheckoutSummary}>
			{areIngredientsAvailable && isLoggedIn ? (
				<div className={BurgerDisplay}>
					<>
						<p>
							Total price:
							<span className={Price}>
								${totalPrice.toFixed(2)}
							</span>
						</p>
						<Burger ingredients={ingredients} />
					</>
				</div>
			) : (
				<GoBackMessage content={message} />
			)}
			{areIngredientsAvailable && isLoggedIn && (
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
