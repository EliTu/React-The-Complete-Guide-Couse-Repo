import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_INGREDIENTS,
	FETCH_INGREDIENTS_FAILED,
} from './constants';
import axiosInstance from '../../../../axios-orders';

export const setIngredients = ingredients => {
	return {
		type: SET_INGREDIENTS,
		ingredients: ingredients,
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: FETCH_INGREDIENTS_FAILED,
		error: true,
	};
};

export const fetchIngredients = () => {
	return async dispatch => {
		try {
			const getIngredientsData = await axiosInstance.get(
				'/ingredients.json'
			);
			dispatch(setIngredients(getIngredientsData.data));
		} catch (error) {
			dispatch(fetchIngredientsFailed());
		}
	};
};

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
