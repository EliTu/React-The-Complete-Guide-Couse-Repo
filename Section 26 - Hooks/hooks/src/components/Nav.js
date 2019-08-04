import React from 'react';

const Nav = ({ switchRoutes }) => {
	return (
		<div>
			<button onClick={switchRoutes}>Auth</button> |{' '}
			<button onClick={switchRoutes}>Todo</button>
		</div>
	);
};

export default Nav;
