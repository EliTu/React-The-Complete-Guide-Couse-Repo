import React, { useState, useCallback, useReducer } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

function Ingredients() {
	const ingredientsReducer = (currentIngredients, action) => {
		switch (action.type) {
			case 'SET':
				return action.ingredients;
			case 'ADD':
				return [...currentIngredients, action.newIngredient];
			case 'DELETE':
				return currentIngredients.filter(el => el.id !== action.id);
			default:
				throw new Error('Should not be called!');
		}
	};
	const [ingredients, dispatch] = useReducer(ingredientsReducer, []);

	// const [ingredients, setIngredients] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const url = 'https://react-hooks-intro-940a4.firebaseio.com';

	const handleAddIngredient = async ingredient => {
		setIsLoading(true);
		try {
			const { name: firebaseId } = await fetch(
				`${url}/ingredients.json`,
				{
					method: 'POST',
					body: JSON.stringify(ingredient),
					headers: { 'Content-Type': 'application/json' },
				}
			).then(data => {
				setIsLoading(false);
				return data.json();
			});

			if (firebaseId) {
				// setIngredients(prevIngredients => [
				// 	...prevIngredients,
				// 	{ id: firebaseId, ...ingredient },
				// ]);

				dispatch({
					type: 'ADD',
					newIngredient: { id: firebaseId, ...ingredient },
				});
			}
		} catch (error) {
			setIsLoading(false);
			error && setIsError(true);
			setErrorMessage('Server error!');
		}
	};

	const handleRemoveIngredient = async id => {
		setIsLoading(true);

		try {
			await fetch(`${url}/ingredients/${id}.json`, {
				method: 'DELETE',
			}).then(data => {
				setIsLoading(() => false);
				// setIngredients(prevIngredients =>
				// 	prevIngredients.filter(el => id !== el.id)
				// );
				dispatch({ type: 'DELETE', id: id });
			});
		} catch (error) {
			setIsLoading(false);
			error && setIsError(true);
			setErrorMessage('Server error!');
		}
	};

	const handleListFilter = useCallback(
		// filteredIngredients => setIngredients(filteredIngredients),
		// []
		filteredIngredients =>
			dispatch({ type: 'SET', ingredients: filteredIngredients }),
		[]
	);

	const handleCloseErrorModal = () => {
		setIsError(false);
		setErrorMessage('');
	};

	return (
		<div className="App">
			{isError ? (
				<ErrorModal onClose={handleCloseErrorModal}>
					{errorMessage}
				</ErrorModal>
			) : (
				<>
					<IngredientForm
						onIngredientsChange={handleAddIngredient}
						loading={isLoading}
					/>
					<section>
						<Search onSearch={handleListFilter} />
						{ingredients.length === 0 ? (
							<LoadingIndicator />
						) : (
							<IngredientList
								ingredients={ingredients}
								id={ingredients.id}
								onRemoveItem={handleRemoveIngredient}
							/>
						)}
					</section>
				</>
			)}
			)}
		</div>
	);
}

export default Ingredients;
