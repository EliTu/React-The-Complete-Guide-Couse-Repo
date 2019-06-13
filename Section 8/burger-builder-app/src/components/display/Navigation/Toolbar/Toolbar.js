import React from 'react';
import Logo from '../../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import styles from './Toolbar.module.css';

const Toolbar = props => {
	// CSS Modules classes:
	const { Toolbar, LogoHeight, DesktopOnly } = styles;

	return (
		<header className={Toolbar}>
			<div className={[LogoHeight, DesktopOnly].join(' ')}>
				<Logo />
			</div>
			<nav className={DesktopOnly}>
				<NavItems />
			</nav>
		</header>
	);
};

export default Toolbar;
