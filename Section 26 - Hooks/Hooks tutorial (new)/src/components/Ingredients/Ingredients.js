import React, { useState, useEffect } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {
	const [ingredients, setIngredients] = useState([]);
	const url = 'https://react-hooks-intro-940a4.firebaseio.com';

	useEffect(() => {
		const fetchIngredients = async () => {
			const response = await fetch(`${url}/ingredients.json`).then(data =>
				data.json()
			);

			if (response) {
				let fetchedArr = [];
				for (let [id, ingredientData] of Object.entries(response)) {
					fetchedArr.push({
						id: id,
						title: ingredientData.title,
						amount: ingredientData.amount,
					});
				}
				setIngredients(fetchedArr);
			}
		};
		fetchIngredients();
	}, []);

	const handleAddIngredient = async ingredient => {
		const { name: firebaseId } = await fetch(`${url}/ingredients.json`, {
			method: 'POST',
			body: JSON.stringify(ingredient),
			headers: { 'Content-Type': 'application/json' },
		}).then(data => data.json());
		if (firebaseId)
			setIngredients(prevIngredients => [
				...prevIngredients,
				{ id: firebaseId, ...ingredient },
			]);
	};

	const handleRemoveIngredient = id =>
		setIngredients(prevIngredients =>
			prevIngredients.filter(el => id !== el.id)
		);

	return (
		<div className="App">
			<IngredientForm onIngredientsChange={handleAddIngredient} />

			<section>
				<Search />
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
