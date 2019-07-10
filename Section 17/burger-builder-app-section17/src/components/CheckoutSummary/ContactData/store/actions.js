import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL } from './constants';
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

export const postPurchasedBurger = order => {
	return async dispatch => {
		try {
			const postRequest = await axiosInstance.post('/orders.json', order);
			console.log(postRequest);
			dispatch(purchaseBurgerSuccess(postRequest, order));
		} catch (error) {
			dispatch(purchaseBurgerFail(error));
		}
	};
};
