import React from 'react';
import styles from './Item.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Item = props => {
	// props:
	const { link, children } = props;

	// CSS Modules styles:
	const { Item } = styles;

	return (
		<li className={Item}>
			<NavLink activeClassName="active" to={link}>
				{children}
			</NavLink>
		</li>
	);
};

Item.propTypes = {
	link: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Item;
