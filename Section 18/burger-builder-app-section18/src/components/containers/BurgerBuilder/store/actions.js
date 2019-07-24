import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_DEFAULT_BURGER_STATE,
	FETCH_INGREDIENTS_FAILED,
} from './constants';
import axiosInstance from '../../../../axios/axios-orders';

export const setDefaultBurgerState = ingredients => {
	return {
		type: SET_DEFAULT_BURGER_STATE,
		ingredients: ingredients,
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
			dispatch(setDefaultBurgerState(getIngredientsData.data));
		} catch (error) {
			dispatch(fetchIngredientsFailed());
		}
	};
};
