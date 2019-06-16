import React from 'react';
import styles from './Item.module.css';
import PropTypes from 'prop-types';

const Item = props => {
	// props:
	const { link, children, active } = props;

	// CSS Modules styles:
	const { Item, activeStyle } = styles;

	return (
		<li className={Item}>
			<a href={link} className={active ? activeStyle : null}>
				{children}
			</a>
		</li>
	);
};

Item.propTypes = {
	link: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	active: PropTypes.bool,
};

export default Item;
