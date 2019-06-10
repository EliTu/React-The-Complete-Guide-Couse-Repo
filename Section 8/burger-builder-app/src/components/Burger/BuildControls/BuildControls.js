import React from 'react';
import styles from './BuildControls.module.css';
import Controller from './Controller/Controller';

const controls = [
	{ label: 'Meat', type: 'meat' },
	{ label: 'Salad', type: 'salad' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Bacon', type: 'bacon' },
];

const BuildControls = props => {
	return (
		<div className={styles.BuildControls}>
			{controls.map(control => (
				<Controller key={control.label} label={control.label} />
			))}
		</div>
	);
};

export default BuildControls;
