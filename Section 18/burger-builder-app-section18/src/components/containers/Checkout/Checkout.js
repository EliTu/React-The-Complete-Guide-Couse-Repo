import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../CheckoutSummary/CheckoutSummary';
import ContactData from '../../CheckoutSummary/ContactData/ContactData';
import styles from './Checkout.module.css';
import PropTypes from 'prop-types';

export class Checkout extends Component {
	handleCancelClick = () => {
		return this.props.history.goBack();
	};

	handleCheckoutClick = () => {
		return this.props.history.replace('/checkout/contact-data');
	};

	render() {
		// CSS Modules styles:
		const { Checkout, CheckoutHeader } = styles;

		// state:
		const { ingredients } = this.props;

		return (
			<>
				<h1 className={CheckoutHeader}>Your burger:</h1>
				<div className={Checkout}>
					<CheckoutSummary
						ingredients={ingredients}
						cancelClick={this.handleCancelClick}
						checkoutClick={this.handleCheckoutClick}
					/>
					<Route
						path={`${this.props.match.path}/contact-data`}
						component={ContactData}
					/>
				</div>
			</>
		);
	}
}

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
