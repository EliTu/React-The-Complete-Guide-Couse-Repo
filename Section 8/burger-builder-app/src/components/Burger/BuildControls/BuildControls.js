import React from 'react';
import styles from './BuildControls.module.css';
import Controller from './Controller/Controller';

const controls = [
	{ label: 'Meat', type: 'meat', position: 0 },
	{ label: 'Salad', type: 'salad', position: 1 },
	{ label: 'Cheese', type: 'cheese', position: 2 },
	{ label: 'Bacon', type: 'bacon', position: 3 },
];

const BuildControls = props => {
	return (
		<div className={styles.BuildControls}>
			{controls.map(control => (
				<Controller
					key={control.label}
					label={control.label}
					clickAdd={() => props.addIngredient(control.type)}
					clickRemove={() => props.removeIngredient(control.type)}
					DisableRemoveButton={props.disableRemove[control.position]}
				/>
			))}
		</div>
	);
};

export default BuildControls;
