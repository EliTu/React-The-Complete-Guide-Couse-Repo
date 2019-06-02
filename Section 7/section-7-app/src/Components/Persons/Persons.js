import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
	// Component update lifecycle methods:
	// static getDerivedStateFromProps(props, state) {
	// 	console.log('Persons.js getDerivedStateFromProps');
	// 	return state;
	// }
	shouldComponentUpdate(nextProps, nextState) {
		console.log('Persons.js shouldComponentUpdate');
		return this.props !== nextProps;
	}

	getSnapshotBeforeUpdate = (prevProps, prevState) => {
		console.log('Persons.js getSnapshotBeforeUpdate');
		return { message: 'Snapshot!' };
	};

	componentDidUpdate(prevProps, prevState, Snapshot) {
		console.log('Persons.js componentDidUpdate');
		console.log(Snapshot);
	}

	componentWillUnmount() {
		console.log('Persons.js componentWillUnmount');
	}

	render() {
		console.log('Persons.js rendering...');
		const { persons, deleteClick, changeName } = this.props;

		return persons.map((person, index) => {
			return (
				<Person
					key={person.id}
					name={person.name}
					age={person.age}
					click={() => deleteClick(index)}
					change={event => changeName(event, person.id)}
				/>
			);
		});
	}
}
export default Persons;
