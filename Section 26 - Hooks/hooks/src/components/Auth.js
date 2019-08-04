import React, { useContext } from 'react';
import AuthContext from '../authContext';

const Auth = () => {
	const { login, isLoggedIn } = useContext(AuthContext);

	return (
		<div>
			<h1>Auth page</h1>
			<button onClick={login}>Log me {!isLoggedIn ? 'in' : 'out'}</button>
			{isLoggedIn && (
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Iure placeat laborum fugiat ex rem facere. Sit expedita
					placeat aliquam debitis? Quisquam quasi modi, officia earum,
					laborum adipisci cupiditate neque provident, non voluptate
					quam recusandae deserunt tempora! Expedita, maiores sit
					dolorem saepe illum necessitatibus laudantium mollitia?
				</p>
			)}
		</div>
	);
};

export default Auth;
