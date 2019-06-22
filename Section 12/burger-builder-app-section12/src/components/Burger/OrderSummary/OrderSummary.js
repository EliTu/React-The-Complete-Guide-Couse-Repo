import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import styles from './OrderSummary.module.css';
import PropTypes from 'prop-types';

const OrderSummary = props => {
	// props:
	const { ingredients, price, closeModalHandler, checkoutHandler } = props;

	// CSS Modules styles:
	const { OrderSummary, IngredientStyle, UnorderedStyle, Price } = styles;

	let ingredientSummary;
	if (ingredients) {
		ingredientSummary = ingredients.map((el, i) => (
			<li className={OrderSummary} key={i}>
				<span className={IngredientStyle}>
					{el.quantity > 0
						? `${el.ingredient} x ${el.quantity}`
						: null}
				</span>
			</li>
		));
	}

	return (
		<>
			<h3>Your Order is ready:</h3>
			<p>A burger with the following ingredients:</p>
			<ul className={UnorderedStyle}>{ingredientSummary}</ul>
			<p>
				Your total price is:
				<span className={Price}>${price.toFixed(2)}</span>
			</p>
			<p>Ready to checkout ?</p>
			<Button type="Confirm">
				<Link to="/orders">Checkout</Link>
			</Button>
			<Button type="Danger" handleClick={closeModalHandler}>
				Cancel
			</Button>
		</>
	);
};

OrderSummary.prototypes = {
	ingredients: PropTypes.array.isRequired,
	price: PropTypes.number.isRequired,
	closeModalHandler: PropTypes.func.isRequired,
	checkoutHandler: PropTypes.func.isRequired,
};
export default OrderSummary;
