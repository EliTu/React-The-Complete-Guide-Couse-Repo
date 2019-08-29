import React, { useState } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {
	const [ingredients, setIngredients] = useState([]);

	const handleAddIngredient = ingredient =>
		setIngredients(prevIngredients => [
			...prevIngredients,
			{ id: (Math.random() * 50).toString(), ...ingredient },
		]);

	const handleRemoveIngredient = id =>
		setIngredients(ingredients.filter(el => id !== el.id));

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
