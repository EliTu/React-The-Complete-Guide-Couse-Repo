import React, { useState } from 'react';
import styles from './Item.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Item = props => {
	// props:
	const { link, children, signInItem } = props;

	// CSS Modules styles:
	const { Item, active } = styles;

	const [isSignInOpen, setIsSignInOpen] = useState(false);
	console.log(isSignInOpen);

	const handleSignInClick = event => {
		event.preventDefault();
		setIsSignInOpen(!isSignInOpen);
		// TODO Set Redux instead of local state to toggle the login box
	};

	const authType = signInItem ? (
		<a
			className={[Item].join(' ')}
			activeClassName={active}
			href={link}
			onClick={event => handleSignInClick(event)}
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

export default Item;
