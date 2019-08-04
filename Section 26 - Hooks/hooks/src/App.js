import React, { useState } from 'react';
import Todo from './components/Todo';
import Auth from './components/Auth';
import Nav from './components/Nav';
import AuthContext from './authContext';

const App = () => {
	const [navState, setNavState] = useState('Todo');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const navStateSwitch = () =>
		setNavState(navState === 'Todo' ? 'Auth' : 'Todo');

	const login = () => setIsLoggedIn(!isLoggedIn);

	return (
		<div className="App">
			<AuthContext.Provider
				value={{ isLoggedIn: isLoggedIn, login: login }}
			>
				<h1>Hooks intro</h1>
				<Nav switchRoutes={navStateSwitch} />
				<hr />
				{navState === 'Auth' && <Auth />}
				{navState === 'Todo' && isLoggedIn && <Todo />}
			</AuthContext.Provider>
		</div>
	);
};

export default App;
