import React, { useState, useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {
	const [ingredients, setIngredients] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const url = 'https://react-hooks-intro-940a4.firebaseio.com';

	const handleAddIngredient = async ingredient => {
		setIsLoading(() => true);

		const { name: firebaseId } = await fetch(`${url}/ingredients.json`, {
			method: 'POST',
			body: JSON.stringify(ingredient),
			headers: { 'Content-Type': 'application/json' },
		}).then(data => {
			setIsLoading(() => false);
			data.json();
		});

		if (firebaseId) {
			setIngredients(prevIngredients => [
				...prevIngredients,
				{ id: firebaseId, ...ingredient },
			]);
		}
	};

	const handleRemoveIngredient = async id => {
		setIsLoading(() => true);
		await fetch(`${url}/ingredients/${id}.json`, {
			method: 'DELETE',
		}).then(data =>
			setIngredients(prevIngredients =>
				prevIngredients.filter(el => id !== el.id)
			)
		);
	};

	const handleListFilter = useCallback(
		filteredIngredients => setIngredients(filteredIngredients),
		[]
	);

	return (
		<div className="App">
			<IngredientForm onIngredientsChange={handleAddIngredient} />

			<section>
				<Search onSearch={handleListFilter} />
				<IngredientList
					ingredients={ingredients}
					id={ingredients.id}
					onRemoveItem={handleRemoveIngredient}
				/>
			</section>
		</div>
	);
}

export default Ingredients;
