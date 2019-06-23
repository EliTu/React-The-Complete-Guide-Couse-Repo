import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../CheckoutSummary/CheckoutSummary';
import ContactData from '../../CheckoutSummary/ContactData/ContactData';
import styles from './Orders.module.css';

export class Orders extends Component {
	state = {
		ingredients: null,
	};

	componentDidMount() {
		// Access the passed ingredients through the Router location prop:
		const ingredientsArr = this.props.location.state
			? this.props.location.state
			: null;
		this.setState({
			ingredients: ingredientsArr,
		});
	}

	handleCancelClick = () => {
		return this.props.history.goBack();
	};

	handleCheckoutClick = () => {
		return this.props.history.replace('/orders/contact-data');
	};

	render() {
		// CSS Modules styles:
		const { Checkout } = styles;

		// state:
		const { ingredients } = this.state;

		return (
			<div className={Checkout}>
				<h1>This is the orders page</h1>
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
		);
	}
}

export default Orders;
