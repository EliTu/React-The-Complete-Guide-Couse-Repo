import * as actionTypes from './constants';

const INITIAL_STATE = {
	ingredients: [
		{ ingredient: 'meat', quantity: 0 },
		{ ingredient: 'salad', quantity: 0 },
		{ ingredient: 'cheese', quantity: 0 },
		{ ingredient: 'bacon', quantity: 0 },
	],
	totalPrice: 3,
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

// action types:
const { ADD_INGREDIENT, REMOVE_INGREDIENT } = actionTypes;

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_INGREDIENT:
			const addedIngredientIndex = state.ingredients.findIndex(
				el => el.ingredient === action.ingredientName
			);

			const incrementQuantity =
				[...state.ingredients][addedIngredientIndex].quantity + 1;

			const addedIngredients = [...state.ingredients];
			addedIngredients[addedIngredientIndex].quantity = incrementQuantity;

			const priceAddition = INGREDIENT_PRICES[action.ingredientName];

			return {
				...state,
				ingredients: addedIngredients,
				totalPrice: state.totalPrice + priceAddition,
			};

		case REMOVE_INGREDIENT:
			const removedIngredientIndex = state.ingredients.findIndex(
				el => el.ingredient === action.ingredientName
			);

			const decrementQuantity =
				[...state.ingredients][removedIngredientIndex].quantity - 1;

			const removedIngredients = [...state.ingredients];
			removedIngredients[
				removedIngredientIndex
			].quantity = decrementQuantity;

			const priceDeduction = INGREDIENT_PRICES[action.ingredientName];

			return {
				...state,
				ingredients: removedIngredients,
				totalPrice: state.totalPrice - priceDeduction,
			};

		default:
			return state;
	}
};

export default reducer;
