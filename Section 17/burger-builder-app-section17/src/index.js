import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './components/containers/BurgerBuilder/store/burgerBuilderReducer';
import orderFormReducer from './components/CheckoutSummary/ContactData/store/orderFormReducer';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// enable redux dev tools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Combine reducers:
const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	orderForm: orderFormReducer,
});

// Init redux store + middleware:
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
