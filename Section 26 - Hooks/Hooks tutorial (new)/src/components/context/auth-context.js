import React, { useState } from 'react';

export const AuthContext = React.createContext({
	isAuth: false,
	login: () => {},
});

const AuthContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLoginClick = () => setIsLoggedIn(true);

	return (
		<AuthContext.Provider
			value={{ login: handleLoginClick, isAuth: isLoggedIn }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
