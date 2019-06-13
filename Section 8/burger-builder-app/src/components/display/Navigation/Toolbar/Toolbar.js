import React from 'react';
import Logo from '../../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
// import ToggleButton from './ToggleButton/ToggleButton';
import Button from '../../../UI/Button/Button';
import styles from './Toolbar.module.css';

const Toolbar = props => {
	// props:
	const { clicked } = props;
	// CSS Modules classes:
	const { Toolbar, LogoHeight, DesktopOnly } = styles;

	return (
		<header className={Toolbar}>
			<div className={[LogoHeight].join(' ')}>
				<Logo />
			</div>
			<nav className={DesktopOnly}>
				<NavItems />
			</nav>
			<Button toolBarButton="MenuToggle" handleClick={clicked}>
				三
			</Button>
		</header>
	);
};

export default Toolbar;
