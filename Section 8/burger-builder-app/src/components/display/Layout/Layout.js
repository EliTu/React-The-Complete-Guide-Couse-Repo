import React from 'react';
import styles from './Layout.module.css';

const Layout = props => {
	return (
		<>
			<div>Toolbar SideDrawer BackDrop</div>
			<main className={styles.layoutStyle}>{props.children}</main>
		</>
	);
};

export default Layout;
