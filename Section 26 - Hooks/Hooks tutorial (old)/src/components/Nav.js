import React, { useContext } from 'react';
import AuthContext from '../authContext';

const Nav = ({ switchRoutes }) => {
	const { isLoggedIn } = useContext(AuthContext);
	return (
		<div>
			<button onClick={switchRoutes}>Auth</button> |{' '}
			{isLoggedIn && <button onClick={switchRoutes}>Todo</button>}
		</div>
	);
};

export default Nav;
