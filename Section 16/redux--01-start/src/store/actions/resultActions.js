import { resultActions } from './actionTypes';

const { STORE_RESULT, DEL_RESULT } = resultActions;

// Action creators:
export const saveResult = res => {
	return {
		type: STORE_RESULT,
		result: res,
	};
};

export const delResult = id => {
	return {
		type: DEL_RESULT,
		id: id,
	};
};

// Async dispatch with redux-thunk:
export const storeResult = res => {
	return dispatch => {
		setTimeout(() => {
			dispatch(saveResult(res));
		}, 2000);
	};
};
