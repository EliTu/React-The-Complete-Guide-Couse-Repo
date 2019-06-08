import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import styles from './Burger.module.css';

const Burger = props => {
	let transformedIngredientsArr = [];
	transformedIngredientsArr = props.ingredients.map(element => {
		let changedArr = [];
		for (let i = 0; i < element.quantity; i++) {
			changedArr.push(
				<Ingredient
					key={`${element.ingredient + Math.random() * 20}`}
					type={element.ingredient}
				/>
			);
		}
		return changedArr;
	});

	return (
		<div className={styles.Burger}>
			<Ingredient type="bread-top" />
			{transformedIngredientsArr}
			<Ingredient type="bread-bottom" />
		</div>
	);
};

export default Burger;
