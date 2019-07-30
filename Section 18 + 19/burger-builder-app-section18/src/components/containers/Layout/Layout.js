import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../display/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../display/Navigation/SIdeDrawer/SideDrawer';
import Backdrop from '../../UI/Backdrop/Backdrop';
import styles from './Layout.module.css';
import PropTypes from 'prop-types';

class Layout extends Component {
	state = {
		isSideDrawerVisible: false,
		isSideDrawerOpen: false,
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isSignInDisplayed !== this.props.isSignInDisplayed) {
			this.setState({
				isSideDrawerVisible: false,
				isSideDrawerOpen: false,
			});
		}
	}

	render() {
		// props:
		const { children, isSignInDisplayed } = this.props;

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
				<Backdrop show={isSignInDisplayed} />
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
	]).isRequired,
	isSignInDisplayed: PropTypes.bool,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isSignInDisplayed: state.signIn.isSignInDisplayed,
	};
};

export default connect(mapStateToProps)(Layout);
