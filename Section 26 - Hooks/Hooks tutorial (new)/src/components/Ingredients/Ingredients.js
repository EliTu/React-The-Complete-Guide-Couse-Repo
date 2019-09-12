import React, { useCallback, useReducer } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/useHttp';
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

	const [
		isLoading,
		isError,
		errorMessage,
		handleHttpRequest,
		handleErrorClear,
	] = useHttp();

	const url = 'https://react-hooks-intro-940a4.firebaseio.com';

	const handleAddIngredient = useCallback(
		ingredient => {
			handleHttpRequest(
				`${url}/ingredients.json`,
				'POST',
				JSON.stringify(ingredient)
			).then(firebaseId =>
				dispatch({
					type: 'ADD',
					newIngredient: { id: firebaseId.name, ...ingredient },
				})
			);
		},
		[handleHttpRequest]
	);

	const handleRemoveIngredient = useCallback(
		id => {
			console.log(id);
			handleHttpRequest(`${url}/ingredients/${id}.json`, 'DELETE');
			dispatch({ type: 'DELETE', id: id });
		},
		[handleHttpRequest]
	);

	const handleListFilter = useCallback(
		filteredIngredients =>
			dispatch({ type: 'SET', ingredients: filteredIngredients }),
		[]
	);

	const handleCloseErrorModal = handleErrorClear;

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
		</div>
	);
}

export default Ingredients;
