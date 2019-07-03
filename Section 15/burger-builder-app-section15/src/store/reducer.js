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
			let addedIngredients = [...state.ingredients].map(ing =>
				ing.ingredeint === action.ingredientName
					? ing.quantity + 1
					: ing
			);
			return {
				...state,
				ingredients: addedIngredients,
			};

		case REMOVE_INGREDIENT:
			let removedIngredients = [...state.ingredients].map(ing =>
				ing.ingredeint === action.ingredientName
					? ing.quantity - 1
					: ing
			);
			return {
				...state,
				ingredients: removedIngredients,
			};

		default:
			return state;
	}
};

export default reducer;
