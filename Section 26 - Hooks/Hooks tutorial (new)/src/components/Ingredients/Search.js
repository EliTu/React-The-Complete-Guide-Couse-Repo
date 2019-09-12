import React, { useState, useEffect, useRef } from 'react';
import useHttp from '../../hooks/useHttp';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';

import './Search.css';

const Search = React.memo(({ onSearch }) => {
	const [input, setInput] = useState('');
	const inputRef = useRef();
	const [
		isLoading,
		isError,
		errorMessage,
		handleHttpRequest,
		handleErrorClear,
	] = useHttp();
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
			{isError && (
				<ErrorModal onClose={handleErrorClear}>
					{errorMessage}
				</ErrorModal>
			)}
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>
					{isLoading && <span>Searching...</span>}
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
