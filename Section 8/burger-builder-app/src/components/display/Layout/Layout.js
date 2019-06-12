import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import PropTypes from 'prop-types';

const Layout = props => {
	// props:
	const { children } = props;

	// CSS Modules styles:
	const { layoutStyle } = styles;

	return (
		<>
			<Toolbar />
			<main className={layoutStyle}>{children}</main>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default Layout;
