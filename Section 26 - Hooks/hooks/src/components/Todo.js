import React, { useState } from 'react';

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	const handleInputChange = e => setInput(e.target.value);

	const handleButtonClick = () => setTodos([...todos, input]);

	return (
		<>
			<input
				type="text"
				placeholder="Todo"
				value={input}
				onChange={e => handleInputChange(e)}
			/>
			<button type="button" onClick={handleButtonClick}>
				Add
			</button>
			<button onClick={() => setTodos([])}>Clear</button>
			<ul>
				{todos.map((el, i) => (
					<li key={i}>{el}</li>
				))}
			</ul>
		</>
	);
};
export default Todo;
