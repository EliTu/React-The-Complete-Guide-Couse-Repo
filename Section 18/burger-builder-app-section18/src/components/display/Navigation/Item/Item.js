import React from 'react';
import styles from './Item.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Item = props => {
	// props:
	const { link, children } = props;

	// CSS Modules styles:
	const { Item, active } = styles;

	return (
		<div className={Item}>
			<NavLink className={Item} activeClassName={active} to={link} exact>
				{children}
			</NavLink>
		</div>
	);
};

Item.propTypes = {
	link: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Item;
