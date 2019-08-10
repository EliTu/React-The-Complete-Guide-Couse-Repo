import React from 'react';
import styles from './Order.module.css';
import PropTypes from 'prop-types';

const Order = props => {
	// props:
	const { ingredients, price, orderId, contact, delivery, date } = props;

	// CSS Modules styles:
	const { Order, Price, DataHeader, Category, OrderId, dateStyle } = styles;

	let mappedContactInfo = [];
	for (let key in contact) {
		mappedContactInfo.push({ [key]: contact[key] });
	}

	const parsedOrderId = orderId.replace(/[-!@#$ %^&* _(),.?":{}|<>]/g, '');

	return (
		<div className={Order}>
			<p className={OrderId}>Order id: {parsedOrderId}</p>
			<p className={dateStyle}>{date}</p>
			<div className={DataHeader}>
				Ingredients:
				<ul>
					{ingredients.map(el =>
						el.quantity > 0 ? (
							<li key={el.ingredient}>
								<span className={Category}>
									{el.ingredient}
								</span>
								x {el.quantity}
							</li>
						) : null
					)}
				</ul>
			</div>

			<div className={DataHeader}>
				Contact information:
				<ul>
					{mappedContactInfo.map(el => {
						const entries = Object.entries(el);
						const key = entries[0][0];
						const value = entries[0][1];
						return (
							<li key={key}>
								<span className={Category}>{key}:</span>
								{value !== '' ? value : 'n/a'}
							</li>
						);
					})}
				</ul>
			</div>

			<p className={DataHeader}>
				<span className={Category}>Delivery method: </span>
				{delivery}
			</p>

			<p className={DataHeader}>
				Total price:<span className={Price}>${price}</span>
			</p>
		</div>
	);
};

Order.propTypes = {
	ingredients: PropTypes.array,
	price: PropTypes.string,
	orderId: PropTypes.string,
	contact: PropTypes.object,
	delivery: PropTypes.string,
	date: PropTypes.string,
};

Order.defaultProps = {
	ingredients: [{ ingredient: 'N/A', quantity: 'N/A' }],
	price: 'N/A',
	orderId: 'N/A',
};

export default Order;
