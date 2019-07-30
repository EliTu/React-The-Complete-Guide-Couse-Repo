import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_DEFAULT_BURGER_STATE,
	FETCH_INGREDIENTS_FAILED,
} from './constants';

const INITIAL_STATE = {
	ingredients: null,
	totalPrice: 3,
	isLoadingRequest: false,
	isErrorOnMount: false,
	isBuilding: false,
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

const burgerBuilderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_DEFAULT_BURGER_STATE:
			return {
				...state,
				ingredients: action.ingredients,
				isErrorOnMount: false,
				totalPrice: 3,
			};

		case FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				isErrorOnMount: true,
			};

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
				isBuilding:
					true && state.ingredients.some(el => el.quantity > 0),
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
				isBuilding:
					true && state.ingredients.some(el => el.quantity > 0),
			};

		default:
			return state;
	}
};

export default burgerBuilderReducer;
