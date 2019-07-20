import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../display/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../display/Navigation/SIdeDrawer/SideDrawer';
import { signInOutsideCloseClick } from '../../display/Navigation/AuthItems/store/actions';
import styles from './Layout.module.css';
import PropTypes from 'prop-types';

class Layout extends Component {
	state = {
		isSideDrawerVisible: false,
		isSideDrawerOpen: false,
	};

	render() {
		// props:
		const { children, closeSignIn } = this.props;

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

		const handleSigninCloseClick = () => {
			closeSignIn();
		};

		return (
			<>
				<Toolbar clicked={handleDrawerButtonClick} />
				<SideDrawer
					isVisible={isSideDrawerVisible}
					handleVisibility={handleSideDrawerCloseClick}
				/>
				<main className={layoutStyle} onClick={handleSigninCloseClick}>
					{children}
				</main>
			</>
		);
	}
}

// Redux setup
const mapDispatchToProps = dispatch => {
	return {
		closeSignIn: () => dispatch(signInOutsideCloseClick()),
	};
};

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default connect(
	null,
	mapDispatchToProps
)(Layout);
