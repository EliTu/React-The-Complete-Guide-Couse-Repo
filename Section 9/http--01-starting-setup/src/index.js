import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Axios defaults baseURL global configuration:
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// Axios defaults set custom headers:
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.common['Content-type'] = 'App/JSON';

// Setting axios interceptor:
const configInterceptor = axios.interceptors.request.use(
	config => {
		console.log(config);
		return config;
	},
	error => {
		console.log(error);
		return Promise.reject(error);
	}
);

const responseInterceptor = axios.interceptors.response.use(
	config => {
		console.log(config);
		return config;
	},
	error => {
		console.log(error);
		return Promise.reject(error);
	}
);

// Removing axios interceptors:
axios.interceptors.request.eject(configInterceptor);
axios.interceptors.response.eject(responseInterceptor);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
