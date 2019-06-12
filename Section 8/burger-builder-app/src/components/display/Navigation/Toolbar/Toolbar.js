import React from 'react';
import Logo from '../../../Logo/Logo';
import styles from './Toolbar.module.css';

const Toolbar = props => {
	// CSS Modules classes:
	const { Toolbar } = styles;

	return (
		<header className={Toolbar}>
			<Logo />
			<div>Menu</div>
			<nav>
				<ul>...</ul>
			</nav>
		</header>
	);
};

export default Toolbar;
