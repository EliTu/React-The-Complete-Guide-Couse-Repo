import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './constants';

export const addIngredient = ingName => {
	return {
		type: ADD_INGREDIENT,
		ingredientName: ingName,
	};
};

export const removeIngredient = ingName => {
	return {
		type: REMOVE_INGREDIENT,
		ingredientName: ingName,
	};
};
