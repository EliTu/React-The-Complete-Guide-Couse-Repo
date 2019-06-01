import React from 'react';
import Person from './Person/Person';

const Persons = props => {
	console.log('Persons.js rendering...');
	return props.persons.map((person, index) => {
		return (
			<Person
				key={person.id}
				name={person.name}
				age={person.age}
				click={() => props.deleteClick(index)}
				change={event => props.changeName(event, person.id)}
			/>
		);
	});
};
export default Persons;
