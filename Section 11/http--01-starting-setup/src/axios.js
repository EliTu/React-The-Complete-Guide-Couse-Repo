import axios from 'axios';

// Create an axios instance:
const instance = axios.create({
	// Can set its own configurations:
	baseURL: 'https://jsonplaceholder.typicode.com',
});

// Can override the global default values for the instance itself:
instance.defaults.headers.common['Authorization'] = 'AUTH INSTANCE';

export default instance;
