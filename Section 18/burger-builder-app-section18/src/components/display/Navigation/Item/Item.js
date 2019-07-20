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
	const { Item, active, AuthSignin } = styles;

	const handleSignInToggleClick = event => {
		event.preventDefault();
		toggleSignIn();
	};

	const authType = signInItem ? (
		<a
			className={[Item, AuthSignin].join(' ')}
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
const mapDispatchToProps = dispatch => {
	return {
		toggleSignIn: () => dispatch(signInToggleClick()),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Item);
