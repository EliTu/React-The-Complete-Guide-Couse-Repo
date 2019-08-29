import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ onSearch }) => {
	const [input, setInput] = useState('');
	const url = 'https://react-hooks-intro-940a4.firebaseio.com';

	useEffect(() => {
		const fetchIngredients = async () => {
			const query =
				input.length === 0 ? '' : `?orderBy="title"&equalTo="${input}"`;

			const response = await fetch(
				`${url}/ingredients.json` + query
			).then(data => data.json());

			if (response) {
				let fetchedArr = [];
				for (let [id, ingredientData] of Object.entries(response)) {
					fetchedArr.push({
						id: id,
						title: ingredientData.title,
						amount: ingredientData.amount,
					});
				}
				// onSearch(fetchedArr);
			}
		};
		fetchIngredients();
	}, [input, onSearch]);

	return (
		<section className="search">
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>
					<input
						type="text"
						onChange={event => setInput(event.target.value)}
						value={input}
					/>
				</div>
			</Card>
		</section>
	);
});

export default Search;
