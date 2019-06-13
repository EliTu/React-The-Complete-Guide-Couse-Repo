import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SIdeDrawer/SideDrawer';
import styles from './Layout.module.css';
import PropTypes from 'prop-types';

class Layout extends Component {
	state = {
		isSideDrawerVisible: false,
		isSideDrawerOpen: false,
	};

	render() {
		// props:
		const { children } = this.props;

		// state:
		const { isSideDrawerVisible } = this.state;

		// CSS Modules styles:
		const { layoutStyle } = styles;

		const handleSideDrawerCloseClick = () => {
			this.setState({
				isSideDrawerVisible: false,
			});
		};

		const handleDrawerButtonClick = () => {
			this.setState({
				isSideDrawerVisible: true,
				isSideDrawerOpen: true,
			});
		};

		return (
			<>
				<Toolbar clicked={handleDrawerButtonClick} />
				<SideDrawer
					isVisible={isSideDrawerVisible}
					handleVisibility={handleSideDrawerCloseClick}
				/>
				<main className={layoutStyle}>{children}</main>
			</>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default Layout;
