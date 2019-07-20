import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signInToggleClick } from '../AuthItems/store/actions';
import styles from './Item.module.css';
import PropTypes from 'prop-types';

const Item = props => {
	// props:
	const { link, children, signInItem, toggleSignIn } = props;

	// CSS Modules styles:
	const { Item, active, AuthSignin, SigninActive } = styles;

	// Handle toggling the display property of the LogIn component
	const handleSignInToggleClick = event => {
		event.preventDefault();
		if (!props.isSignInDisplayed) toggleSignIn();
	};

	// Set style when the LogIn component is displayed
	const signInActive = props.isSignInDisplayed ? SigninActive : null;

	const authType = signInItem ? (
		<a
			className={[Item, AuthSignin, signInActive].join(' ')}
			activeClassName={active}
			href={link}
			onClick={event => handleSignInToggleClick(event)}
		>
			Sign in
		</a>
	) : (
		<NavLink className={Item} activeClassName={active} to={link} exact>
			{children}
		</NavLink>
	);

	return <div className={Item}>{authType}</div>;
};

Item.propTypes = {
	link: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	signInItem: PropTypes.bool,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		isSignInDisplayed: state.signIn.isSignInDisplayed,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		toggleSignIn: () => dispatch(signInToggleClick()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Item);
