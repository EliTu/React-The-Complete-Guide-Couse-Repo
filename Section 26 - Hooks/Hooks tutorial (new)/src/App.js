import React, { useContext } from 'react';
import Auth from './components/Auth';
import { AuthContext } from './components/context/auth-context';
import Ingredients from './components/Ingredients/Ingredients';

const App = props => {
	const { isAuth } = useContext(AuthContext);

	return !isAuth ? <Auth></Auth> : <Ingredients />;
};

export default App;
