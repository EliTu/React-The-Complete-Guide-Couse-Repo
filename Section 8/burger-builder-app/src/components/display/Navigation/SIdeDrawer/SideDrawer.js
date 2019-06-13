import React from 'react';
import Logo from '../../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
// import PropTypes from 'prop-types';
import styles from './SIdeDrawer.module.css';

const SideDrawer = props => {
	// CSS Modules styles:
	const { SideDrawer, LogoHeight } = styles;

	return (
		<div className={SideDrawer}>
			<div className={LogoHeight}>
				<Logo />
			</div>
			<nav>
				<NavItems />
			</nav>
		</div>
	);
};

SideDrawer.propTypes = {};

export default SideDrawer;
