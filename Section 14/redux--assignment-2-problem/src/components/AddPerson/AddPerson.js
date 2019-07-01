import React, { useState } from 'react';

import './AddPerson.css';

const addPerson = props => {
	const [name, setName] = useState('');
	const [age, setAge] = useState('');

	return (
		<div className="AddPerson">
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={event => setName(event.target.value)}
			/>
			<input
				type="number"
				placeholder="Age"
				value={age}
				onChange={event =>
					setAge(Number.parseInt(event.target.value, 10))
				}
			/>
			<button onClick={() => props.personAdded(name, age)}>
				Add Person
			</button>
		</div>
	);
};

export default addPerson;
