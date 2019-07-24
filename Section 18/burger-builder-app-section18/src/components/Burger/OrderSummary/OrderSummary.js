import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import Button from '../../UI/Button/Button';
import { signInToggleClick } from '../../display/Navigation/AuthItems/store/actions';
import styles from './OrderSummary.module.css';
import PropTypes from 'prop-types';

const OrderSummary = ({
	ingredients,
	price,
	closeModalHandler,
	checkoutHandler,
	isLoggedIn,
	openSignIn,
	...props
}) => {
	// CSS Modules styles:
	const { OrderSummary, IngredientStyle, UnorderedStyle, Price } = styles;

	// If a user is not signed in, prompt the sign in menu open
	const handleSignInButtonClick = () => {
		openSignIn();
		closeModalHandler();
	};

	// If a user is not signed in, prompt redirection to sign up page
	const handleSignUpButtonClick = () => {
		props.history.push('/signup');
	};

	let ingredientSummary;
	if (ingredients) {
		ingredientSummary = ingredients.map((el, i) => (
			<li className={OrderSummary} key={i}>
				<span className={IngredientStyle}>
					{el.quantity > 0
						? `${el.ingredient} x ${el.quantity}`
						: null}
				</span>
			</li>
		));
	}

	return (
		<>
			<h3>Your Order is ready</h3>
			<p>A burger with the following ingredients:</p>
			<ul className={UnorderedStyle}>{ingredientSummary}</ul>
			<p>
				Your total price is:
				<span className={Price}>${price.toFixed(2)}</span>
			</p>
			{isLoggedIn ? (
				<>
					<p>Ready to checkout ?</p>
					<Button type="Confirm" handleClick={checkoutHandler}>
						Checkout
					</Button>
					<Button type="Danger" handleClick={closeModalHandler}>
						Cancel
					</Button>
				</>
			) : (
				<>
					<p>
						In order to proceed to checkout, you need to be a
						registered member. Please sign in before proceeding, or
						sign up as a new member!
					</p>
					<Button
						type="Confirm"
						handleClick={handleSignInButtonClick}
					>
						Sign in
					</Button>
					<Button
						type="Confirm"
						handleClick={handleSignUpButtonClick}
					>
						Sign up a new user
					</Button>
				</>
			)}
		</>
	);
};

OrderSummary.prototypes = {
	ingredients: PropTypes.array.isRequired,
	price: PropTypes.number.isRequired,
	closeModalHandler: PropTypes.func.isRequired,
	checkoutHandler: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool,
	openSignIn: PropTypes.func,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		openSignIn: () => dispatch(signInToggleClick()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(OrderSummary));
