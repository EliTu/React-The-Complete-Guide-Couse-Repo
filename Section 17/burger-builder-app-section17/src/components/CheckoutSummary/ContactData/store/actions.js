import {
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_BURGER_FAIL,
	PURCHASE_BURGER_INIT,
} from './constants';
import axiosInstance from '../../../../axios-orders';

export const purchaseBurgerSuccess = (id, order) => {
	return {
		type: PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: order,
	};
};

export const purchaseBurgerFail = error => {
	return {
		type: PURCHASE_BURGER_FAIL,
		error: error,
	};
};

export const purchaseBurgerInit = () => {
	return {
		type: PURCHASE_BURGER_INIT,
	};
};

export const postPurchasedBurger = order => {
	return async dispatch => {
		dispatch(purchaseBurgerInit());
		try {
			console.log(order);
			const postRequest = await axiosInstance.post('/orders.json', order);
			console.log(postRequest);
			dispatch(purchaseBurgerSuccess(postRequest.id, order));
		} catch (error) {
			dispatch(purchaseBurgerFail(error));
		}
	};
};
