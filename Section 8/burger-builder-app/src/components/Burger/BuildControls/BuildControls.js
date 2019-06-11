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
	// props:
	const {
		price,
		addIngredient,
		removeIngredient,
		disableRemove,
		purchasable,
	} = props;

	// CSS Modules styles:
	const { BuildControls, Price, Sum, OrderButton } = styles;

	return (
		<div className={BuildControls}>
			<p className={Price}>
				Total Price:
				<span className={Sum}>${price.toFixed(2)}</span>
			</p>
			{controls.map(control => (
				<Controller
					key={control.label}
					label={control.label}
					clickAdd={() => addIngredient(control.type)}
					clickRemove={() => removeIngredient(control.type)}
					DisableRemoveButton={disableRemove[control.position]}
				/>
			))}
			<button className={OrderButton} disabled={!purchasable}>
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
