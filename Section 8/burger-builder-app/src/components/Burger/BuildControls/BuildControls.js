import React from 'react';
import styles from './BuildControls.module.css';
import Controller from './Controller/Controller';
import PropTypes from 'prop-types';

const controls = [
	{ label: 'Meat', type: 'meat', position: 0 },
	{ label: 'Salad', type: 'salad', position: 1 },
	{ label: 'Cheese', type: 'cheese', position: 2 },
	{ label: 'Bacon', type: 'bacon', position: 3 },
];

const BuildControls = props => {
	return (
		<div className={styles.BuildControls}>
			<p className={styles.Price}>
				Total Price:
				<span className={styles.Sum}>${props.price.toFixed(2)}</span>
			</p>
			{controls.map(control => (
				<Controller
					key={control.label}
					label={control.label}
					clickAdd={() => props.addIngredient(control.type)}
					clickRemove={() => props.removeIngredient(control.type)}
					DisableRemoveButton={props.disableRemove[control.position]}
				/>
			))}
			<button
				className={styles.OrderButton}
				disabled={!props.purchasable}
			>
				Order now
			</button>
		</div>
	);
};

BuildControls.propTypes = {
	price: PropTypes.number,
	addIngredient: PropTypes.func,
	removeIngredient: PropTypes.func,
	disableRemove: PropTypes.array,
	purchasable: PropTypes.bool,
};

export default BuildControls;
