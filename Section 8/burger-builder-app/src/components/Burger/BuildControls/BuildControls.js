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
		setPurchaseMode,
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
			<button
				className={OrderButton}
				disabled={!purchasable}
				onClick={setPurchaseMode}
			>
				Order now
			</button>
		</div>
	);
};

BuildControls.propTypes = {
	price: PropTypes.number.isRequired,
	addIngredient: PropTypes.func.isRequired,
	removeIngredient: PropTypes.func.isRequired,
	disableRemove: PropTypes.array.isRequired,
	purchasable: PropTypes.bool.isRequired,
	setPurchaseMode: PropTypes.func.isRequired,
};

export default BuildControls;
