import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../CheckoutSummary/CheckoutSummary';
import ContactData from '../../CheckoutSummary/ContactData/ContactData';
import styles from './Checkout.module.css';

export class Checkout extends Component {
	state = {
		ingredients: null,
		price: 0,
	};

	componentDidMount() {
		console.log(this.props.location);
		// Access the passed ingredients through the Router location prop:
		const passedIngredients = this.props.location.state
			? this.props.location.state.ingredients
			: null;

		const passedPrice = this.props.location.state
			? this.props.location.state.price
			: null;

		this.setState({
			ingredients: passedIngredients,
			price: passedPrice,
		});
	}

	handleCancelClick = () => {
		return this.props.history.goBack();
	};

	handleCheckoutClick = () => {
		return this.props.history.replace('/checkout/contact-data');
	};

	render() {
		// CSS Modules styles:
		const { Checkout } = styles;

		// state:
		const { ingredients, price } = this.state;

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
					render={props => (
						<ContactData
							ingredients={ingredients}
							price={price}
							{...props}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
