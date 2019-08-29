import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
	const [title, setTitle] = useState('');
	const [number, setNumber] = useState('');
	const [ingredients, setIngredients] = useState([]);

	const handleChange = (event, id) =>
		id === 'title'
			? setTitle(event.target.value)
			: setNumber(event.target.value);

	const submitHandler = event => {
		event.preventDefault();
		setIngredients([...ingredients, { title: title, number: number }]);
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
							onChange={event => handleChange(event, 'title')}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							value={number}
							onChange={event => handleChange(event, 'number')}
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
