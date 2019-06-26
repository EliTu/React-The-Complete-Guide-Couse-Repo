import React from 'react';
import styles from './Order.module.css';
import PropTypes from 'prop-types';

const Order = props => {
	// props:
	const { ingredients, price, orderId } = props;

	// CSS Modules styles:
	const { Order, Price, Ingredients, OrderId } = styles;

	return (
		<div className={Order}>
			<p className={OrderId}>Order id: {orderId}</p>
			<div className={Ingredients}>
				Ingredients:
				<p>
					{ingredients.map(el =>
						el.quantity > 0
							? `${el.ingredient} x ${el.quantity} | `
							: null
					)}
				</p>
			</div>
			<p>
				Total price:<span className={Price}>${price}</span>
			</p>
		</div>
	);
};

Order.propTypes = {
	ingredients: PropTypes.array,
	price: PropTypes.string,
	orderId: PropTypes.string,
};

Order.defaultProps = {
	ingredients: [{ ingredient: 'N/A', quantity: 'N/A' }],
	price: 'N/A',
	orderId: 'N/A',
};

export default Order;
