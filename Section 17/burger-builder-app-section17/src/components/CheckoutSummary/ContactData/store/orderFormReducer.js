import {
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_FAIL,
	PURCHASE_BURGER_INIT,
} from './constants';

const INITIAL_STATE = {
	orders: [],
	isLoading: false,
};

const orderFormReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PURCHASE_BURGER_INIT:
			return {
				...state,
				isLoading: true,
			};
		case PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
			};
			return {
				...state,
				isLoading: false,
				orders: state.orders.concat(newOrder),
			};

		case PURCHASE_BURGER_FAIL:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
};

export default orderFormReducer;
