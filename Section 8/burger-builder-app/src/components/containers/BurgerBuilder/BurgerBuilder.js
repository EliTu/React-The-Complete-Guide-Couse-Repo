import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
// import PropTypes from 'prop-types';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};
class BurgerBuilder extends Component {
	state = {
		ingredients: [
			{ ingredient: 'meat', quantity: 0 },
			{ ingredient: 'salad', quantity: 0 },
			{ ingredient: 'cheese', quantity: 0 },
			{ ingredient: 'bacon', quantity: 0 },
		],
		totalPrice: 3,
	};

	handleAddIngredientClick = type => {
		const ingredientIndex = this.state.ingredients.findIndex(
			el => el.ingredient === type
		);

		const incrementQuantity =
			[...this.state.ingredients][ingredientIndex].quantity + 1;

		const newIngredients = [...this.state.ingredients];
		newIngredients[ingredientIndex].quantity = incrementQuantity;

		const priceAddition =
			INGREDIENT_PRICES[
				[...this.state.ingredients][ingredientIndex].ingredient
			];

		this.setState(prevState => {
			return {
				ingredients: newIngredients,
				totalPrice: prevState.totalPrice + priceAddition,
			};
		});
	};

	handleRemoveIngredientClick = type => {
		const ingredientIndex = this.state.ingredients.findIndex(
			el => el.ingredient === type
		);

		// If quantity is 0 or less then don't execute
		if ([...this.state.ingredients][ingredientIndex].quantity <= 0) return;

		const decrementQuantity =
			[...this.state.ingredients][ingredientIndex].quantity - 1;

		const newIngredients = [...this.state.ingredients];
		newIngredients[ingredientIndex].quantity = decrementQuantity;

		const priceDeduction =
			INGREDIENT_PRICES[
				[...this.state.ingredients][ingredientIndex].ingredient
			];

		this.setState(prevState => {
			return {
				ingredients: newIngredients,
				totalPrice: prevState.totalPrice - priceDeduction,
			};
		});
	};

	render() {
		const { ingredients } = this.state;
		const isQuantityZero = [...this.state.ingredients].map(
			el => el.quantity <= 0
		);

		return (
			<>
				<Burger ingredients={ingredients} />
				<BuildControls
					addIngredient={this.handleAddIngredientClick}
					removeIngredient={this.handleRemoveIngredientClick}
					disableRemove={isQuantityZero}
				/>
			</>
		);
	}
	static propTypes = {};
}

export default BurgerBuilder;
