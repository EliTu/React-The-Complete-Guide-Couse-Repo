import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL } from './constants';

const INITIAL_STATE = {
	orders: [],
	isLoading: false,
};

const orderFormReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.order,
				id: action.id,
			};
			return {
				...state,
				isLoading: false,
				orders: state.orders.concat(newOrder),
			};

		case PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};

export default orderFormReducer;
