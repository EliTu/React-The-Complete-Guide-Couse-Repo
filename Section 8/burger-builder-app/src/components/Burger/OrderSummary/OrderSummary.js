import React from 'react';
import styles from './OrderSummary.module.css';
import PropTypes from 'prop-types';

const OrderSummary = props => {
	// props:
	const { ingredients } = props;

	// CSS Modules styles:
	const { OrderSummary, IngredientStyle, UnorderedStyle } = styles;

	const ingredientSummary = ingredients.map((el, i) => (
		<li className={OrderSummary} key={i}>
			<span className={IngredientStyle}>
				{el.quantity > 0 ? `${el.ingredient} x ${el.quantity}` : null}
			</span>
		</li>
	));

	return (
		<>
			<h3>Your Order:</h3>
			<p>A Burger with the following ingredients:</p>
			<ul className={UnorderedStyle}>{ingredientSummary}</ul>
			<p>Ready to checkout ?</p>
			<button>Checkout</button>
			<button>Cancel</button>
		</>
	);
};

OrderSummary.prototypes = {
	ingredients: PropTypes.array,
};
export default OrderSummary;
