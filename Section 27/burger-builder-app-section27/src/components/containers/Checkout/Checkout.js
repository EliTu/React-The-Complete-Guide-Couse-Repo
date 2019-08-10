import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../CheckoutSummary/CheckoutSummary';
import ContactData from '../../CheckoutSummary/ContactData/ContactData';
import styles from './Checkout.module.css';
import PropTypes from 'prop-types';

export const Checkout = ({ ingredients, history, match }) => {
	const handleCancelClick = () => {
		return history.goBack();
	};

	const handleCheckoutClick = () => {
		return history.replace('/checkout/contact-data');
	};

	// CSS Modules styles:
	const { Checkout, CheckoutHeader } = styles;

	return (
		<>
			<h1 className={CheckoutHeader}>Your burger:</h1>
			<div className={Checkout}>
				<CheckoutSummary
					ingredients={ingredients}
					cancelClick={handleCancelClick}
					checkoutClick={handleCheckoutClick}
				/>
				<Route
					path={`${match.path}/contact-data`}
					component={ContactData}
				/>
			</div>
		</>
	);
};

Checkout.propTypes = {
	ingredients: PropTypes.array,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
	};
};

export default connect(mapStateToProps)(Checkout);
