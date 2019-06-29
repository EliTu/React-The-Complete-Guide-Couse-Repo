// For using Node.js:
const redux = require('redux');

const createStore = redux.createStore;

const initialState = {
	counter: 0,
};

// 1: Reducer
const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INC_COUNTER':
			state = {
				...state,
				counter: state.counter + 1,
			};
			break;

		case 'ADD_COUNTER':
			state = {
				...state,
				counter: state.counter + action.value,
			};
			break;

		default:
			state;
	}
	return state;
};

// 2: Store
const store = createStore(rootReducer);
console.log(store.getState());

// 3: Subscription
store.subscribe(() => console.log('Subscribed!', store.getState()));

// 4: Actions
store.dispatch({ type: 'INC_COUNTER' });
store.dispatch({ type: 'ADD_COUNTER', value: 10 });
console.log(store.getState());
