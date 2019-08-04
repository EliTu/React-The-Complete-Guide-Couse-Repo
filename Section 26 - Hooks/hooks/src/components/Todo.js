import React, { useState } from 'react';

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	const handleNewTodoItem = () => {
		setTodos([...todos, input]);
		setTimeout(() => {
			try {
				console.log(`ADDED ASYNC ${input} `);
			} catch (error) {
				console.log(error);
			}
		}, 2000);
	};

	const handleInputChange = e => setInput(e.target.value);

	const handleAddButtonClick = () => handleNewTodoItem();

	const handleInputEnterPress = e =>
		e.key === 'Enter' ? handleNewTodoItem() : null;

	return (
		<>
			<input
				type="text"
				placeholder="Todo"
				value={input}
				onChange={e => handleInputChange(e)}
				onKeyPress={e => handleInputEnterPress(e)}
			/>
			<button type="button" onClick={handleAddButtonClick}>
				Add
			</button>
			<button onClick={() => setTodos([])}>Clear</button>
			<ul>
				{todos.map((todo, i) => (
					<li key={i}>{todo}</li>
				))}
			</ul>
		</>
	);
};
export default Todo;
