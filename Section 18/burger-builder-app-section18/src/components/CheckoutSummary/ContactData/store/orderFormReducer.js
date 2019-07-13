import {
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_FAIL,
	PURCHASE_BURGER_INIT,
} from './constants';
import {
	FETCH_ORDERS_INIT,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAIL,
} from '../../../containers/Orders/store/constants.js';

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
			console.log(action.orderData);
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

		case FETCH_ORDERS_INIT:
			return {
				...state,
				isLoading: true,
			};

		case FETCH_ORDERS_SUCCESS:
			return {
				...state,
				orders: action.orders,
				isLoading: false,
			};

		case FETCH_ORDERS_FAIL:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
};

export default orderFormReducer;
