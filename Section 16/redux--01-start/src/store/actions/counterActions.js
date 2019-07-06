import { counterActions } from './actionTypes';

const { INCREMENT, DECREMENT, ADD, SUBTRACT } = counterActions;

// Action creators:
export const increment = () => {
	return {
		type: INCREMENT,
	};
};
export const decrement = () => {
	return {
		type: DECREMENT,
	};
};
export const add = val => {
	return {
		type: ADD,
		value: val,
	};
};
export const subtract = val => {
	return {
		type: SUBTRACT,
		value: val,
	};
};
