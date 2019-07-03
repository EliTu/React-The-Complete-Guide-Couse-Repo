import React from 'react';
import LogoImg from '../../assets/Image/burger-logo.png';
import styles from './Logo.module.css';

const Logo = props => {
	// CSS Modules styles:
	const { Logo } = styles;

	return (
		<div className={Logo}>
			<img src={LogoImg} alt="Burger Builder app logo" />
		</div>
	);
};
export default Logo;
