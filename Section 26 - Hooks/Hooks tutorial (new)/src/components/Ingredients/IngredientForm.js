import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(({ onIngredientsChange }) => {
	const [title, setTitle] = useState('');
	const [number, setNumber] = useState('');

	const submitHandler = event => {
		event.preventDefault();
		onIngredientsChange({ title: title, amount: number });
	};

	return (
		<section className="ingredient-form">
			<Card>
				<form onSubmit={submitHandler}>
					<div className="form-control">
						<label htmlFor="title">Name</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={event => setTitle(event.target.value)}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							value={number}
							onChange={event => setNumber(event.target.value)}
						/>
					</div>
					<div className="ingredient-form__actions">
						<button type="submit">Add Ingredient</button>
					</div>
				</form>
			</Card>
		</section>
	);
});

export default IngredientForm;
