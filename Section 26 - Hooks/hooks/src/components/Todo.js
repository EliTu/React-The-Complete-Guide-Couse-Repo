import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	const handleNewTodoItem = async () => {
		try {
			await axios.post(
				'https://react-hooks-intro-940a4.firebaseio.com/todos.json',
				{ todo: input }
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getTodoData = async () => {
			try {
				const todoData = await axios.get(
					'https://react-hooks-intro-940a4.firebaseio.com/todos.json'
				);
				const todoItems = todoData.data;
				let newTodoList = [];
				for (let item in todoItems) {
					newTodoList.push({ id: item, name: todoItems[item].todo });
				}
				setTodos(newTodoList);
			} catch (error) {
				console.log(error);
			}
		};
		getTodoData();
	}, [todos]);

	const handleMouseMove = e => {
		console.log(e.clientX, e.clientY);
	};

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);
		return () => {
			console.log('Cleanup');
			document.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	const handleInputChange = e => setInput(e.target.value);

	const handleAddButtonClick = () => handleNewTodoItem();

	const handleInputEnterPress = e =>
		e.key === 'Enter' ? handleNewTodoItem() : null;

	const handleClearButtonClick = async () => {
		await axios.delete(
			'https://react-hooks-intro-940a4.firebaseio.com/todos.json'
		);
	};

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
			<button onClick={handleClearButtonClick}>Clear</button>
			<ul>
				{todos.map(todo => (
					<li key={todo.id}>{todo.name}</li>
				))}
			</ul>
		</>
	);
};
export default Todo;
