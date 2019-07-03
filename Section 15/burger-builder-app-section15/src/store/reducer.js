import { BurgerBuilderActions } from './actions';

const INITIAL_STATE = {
	ingredients: [
		{ ingredient: 'meat', quantity: 0 },
		{ ingredient: 'salad', quantity: 0 },
		{ ingredient: 'cheese', quantity: 0 },
		{ ingredient: 'bacon', quantity: 0 },
	],
	totalPrice: 3,
};

// BurgerBuilderActions:
const { ADD_INGREDIENT, REMOVE_INGREDIENT } = BurgerBuilderActions;

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
            
			return {
				...state,
				ingredients: addedIngredients,
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

			return {
				...state,
				ingredients: removedIngredients,
			};

		default:
			return state;
	}
};

export default reducer;
