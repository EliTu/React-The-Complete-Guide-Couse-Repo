import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useFormValidation } from '../hooks/useFormValidation';

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');
	const { value, onChange, isValid } = useFormValidation();

	const handleNewTodoItem = async () => {
		if (value !== '')
			try {
				setInput('');
				await axios.post(
					'https://react-hooks-intro-940a4.firebaseio.com/todos.json',
					{ todo: value }
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

	const handleAddButtonClick = () => handleNewTodoItem();

	const handleInputEnterPress = e =>
		e.key === 'Enter' ? handleNewTodoItem() : null;

	const handleClearButtonClick = async () => {
		await axios.delete(
			`https://react-hooks-intro-940a4.firebaseio.com/todos.json`
		);
	};

	const handleTodoItemClick = async id => {
		await axios.delete(
			`https://react-hooks-intro-940a4.firebaseio.com/todos/${id}.json`
		);
	};

	return (
		<>
			<input
				type="text"
				placeholder="Todo"
				value={value}
				style={{ backgroundColor: !isValid ? 'indigo' : null }}
				onChange={onChange}
				onKeyPress={e => handleInputEnterPress(e)}
			/>
			<button type="button" onClick={handleAddButtonClick}>
				Add
			</button>git
			<button onClick={handleClearButtonClick}>Clear</button>
			{useMemo(
				() => (
					<ul>
						{todos.map(todo => (
							<li
								key={todo.id}
								onClick={id => handleTodoItemClick(todo.id)}
							>
								{todo.name}
							</li>
						))}
					</ul>
				),
				[todos]
			)}
		</>
	);
};
export default Todo;
