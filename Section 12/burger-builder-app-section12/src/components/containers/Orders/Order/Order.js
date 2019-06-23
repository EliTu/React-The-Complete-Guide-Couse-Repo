import React from 'react';
import styles from './Order.module.css';

const Order = props => {
	// CSS Modules styles:
	const { Order } = styles;

	return (
		<div className={Order}>
			<p>Ingredients:</p>
			<p>Price:$</p>
		</div>
	);
};

export default Order;
