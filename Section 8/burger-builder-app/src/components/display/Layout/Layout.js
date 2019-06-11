import React from 'react';
import styles from './Layout.module.css';
import PropTypes from 'prop-types';

const Layout = props => {
	// props:
	const { children } = props;

	// CSS Modules styles:
	const { layoutStyle } = styles;

	return (
		<>
			<div>Toolbar SideDrawer BackDrop</div>
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
