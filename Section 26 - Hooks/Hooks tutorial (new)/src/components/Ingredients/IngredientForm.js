import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
	const [{ title, number }, setInputValue] = useState({
		title: '',
		number: '',
	});
	const [ingredients, setIngredients] = useState([]);

	const submitHandler = event => {
		event.preventDefault();
		setIngredients([...ingredients, { title, number }]);
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
							onChange={event => {
								const newTitle = event.target.value;
								setInputValue(prevState => ({
									number: prevState.number,
									title: newTitle,
								}));
							}}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							value={number}
							onChange={event => {
								const newNumber = event.target.value;
								setInputValue(prevState => ({
									title: prevState.title,
									number: newNumber,
								}));
							}}
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
