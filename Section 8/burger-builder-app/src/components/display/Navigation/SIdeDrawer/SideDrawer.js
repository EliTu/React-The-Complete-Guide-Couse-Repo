import React from 'react';
import Logo from '../../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import PropTypes from 'prop-types';
import styles from './SIdeDrawer.module.css';

const SideDrawer = props => {
	// props:
	const { handleVisibility, isVisible } = props;
	// CSS Modules styles:
	const { SideDrawer, LogoHeight, Close, Open } = styles;

	let attachedClasses = [SideDrawer, Close];
	if (isVisible) attachedClasses = [SideDrawer, Open];

	return (
		<>
			<Backdrop show={isVisible} removeBackdrop={handleVisibility} />
			<div className={attachedClasses.join(' ')}>
				<div className={LogoHeight}>
					<Logo />
				</div>
				<nav>
					<NavItems />
				</nav>
			</div>
		</>
	);
};

SideDrawer.propTypes = {
	handleVisibility: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
};

export default SideDrawer;
