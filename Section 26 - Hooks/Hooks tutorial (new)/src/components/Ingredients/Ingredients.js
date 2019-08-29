import React, { useState } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {
	const [ingredients, setIngredients] = useState([]);

	const handleIngredientsAddition = ingredient =>
		setIngredients(prevIngredients => [
			...prevIngredients,
			{ id: (Math.random() * 50).toString(), ...ingredient },
		]);

	return (
		<div className="App">
			<IngredientForm onIngredientsChange={handleIngredientsAddition} />

			<section>
				<Search />
				<IngredientList
					ingredients={ingredients}
					id={ingredients.id}
					onRemoveItem={() => []}
				/>
			</section>
		</div>
	);
}

export default Ingredients;
