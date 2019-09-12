import React, { useState, useEffect, useRef } from 'react';
import useHttp from '../../hooks/useHttp';
import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ onSearch }) => {
	const [input, setInput] = useState('');
	const inputRef = useRef();
	const [, , , handleHttpRequest] = useHttp();
	const url = 'https://react-hooks-intro-940a4.firebaseio.com';

	useEffect(() => {
		const keyStrokeTImer = setTimeout(() => {
			if (input === inputRef.current.value) {
				const query =
					input.length === 0
						? ''
						: `?orderBy="title"&equalTo="${input}"`;

				handleHttpRequest(
					`${url}/ingredients.json` + query,
					'GET'
				).then(response => {
					if (response) {
						let fetchedArr = [];
						for (let [id, ingredientData] of Object.entries(
							response
						)) {
							fetchedArr.push({
								id: id,
								title: ingredientData.title,
								amount: ingredientData.amount,
							});
						}
						onSearch(fetchedArr);
					}
				});
			}
		}, 500);

		return () => clearTimeout(keyStrokeTImer);
	}, [input, onSearch, inputRef, handleHttpRequest]);

	return (
		<section className="search">
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>
					<input
						type="text"
						onChange={event => setInput(event.target.value)}
						value={input}
						ref={inputRef}
					/>
				</div>
			</Card>
		</section>
	);
});

export default Search;
