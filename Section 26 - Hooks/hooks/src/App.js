import React, { useState } from 'react';
import Todo from './components/Todo';
import Auth from './components/Auth';
import Nav from './components/Nav';

const App = () => {
	const [navState, setNavState] = useState('Todo');

	const navStateSwitch = () => {
		setNavState(navState === 'Todo' ? 'Auth' : 'Todo');
	};

	return (
		<div className="App">
			<h1>Hooks intro</h1>
			<Nav switchRoutes={navStateSwitch} />
			<hr />
			{navState === 'Auth' && <Auth />}
			{navState === 'Todo' && <Todo />}
		</div>
	);
};

export default App;
