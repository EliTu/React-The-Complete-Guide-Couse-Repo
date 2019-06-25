import React from 'react';
import styles from './Order.module.css';

const Order = props => {
	// props:
	const { ingredients, price, orderId } = props;

	// CSS Modules styles:
	const { Order, Price, Ingredients } = styles;

	return (
		<div className={Order}>
			Order id: {orderId}
			<ul className={Ingredients}>
				Ingredients:
				<li>
					{ingredients.map(el =>
						el.quantity > 0
							? `${el.ingredient} x ${el.quantity} | `
							: null
					)}
				</li>
			</ul>
			<p>
				Price:<span className={Price}>${price}</span>
			</p>
		</div>
	);
};

export default Order;
