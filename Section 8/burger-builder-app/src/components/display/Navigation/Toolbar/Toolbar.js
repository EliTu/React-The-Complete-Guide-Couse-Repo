import React from 'react';
import Logo from '../../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import styles from './Toolbar.module.css';

const Toolbar = props => {
	// CSS Modules classes:
	const { Toolbar } = styles;

	return (
		<header className={Toolbar}>
			<Logo img="../../assets/Image/burger-logo.png" />
			<nav>
				<NavItems />
			</nav>
		</header>
	);
};

export default Toolbar;
