import React, { useState } from 'react';

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	const handleInputChange = e => setInput(e.target.value);

	const handleButtonClick = () => setTodos([...todos, input]);

	const handleEnterPress = e =>
		e.key === 'Enter' ? setTodos([...todos, input]) : null;

	return (
		<>
			<input
				type="text"
				placeholder="Todo"
				value={input}
				onChange={e => handleInputChange(e)}
				onKeyPress={e => handleEnterPress(e)}
			/>
			<button type="button" onClick={handleButtonClick}>
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
