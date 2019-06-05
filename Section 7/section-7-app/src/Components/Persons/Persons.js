import React, { PureComponent } from 'react';
import Person from './Person/Person';
import PropTypes from 'prop-types';

class Persons extends PureComponent {
	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('Persons.js shouldComponentUpdate');
	// 	if (
	// 		this.props.persons !== nextProps.persons ||
	// 		this.props.change !== nextProps.change ||
	// 		this.props.click !== nextProps.click
	// 	) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

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
		const {
			persons,
			deleteClick,
			changeName,
			isAuthenticated,
		} = this.props;

		return persons.map((person, index) => {
			return (
				<Person
					key={person.id}
					name={person.name}
					age={person.age}
					click={() => deleteClick(index)}
					change={event => changeName(event, person.id)}
					isAuthenticated={isAuthenticated}
				/>
			);
		});
	}
}

Person.propTypes = {
	click: PropTypes.func,
	name: PropTypes.string,
	age: PropTypes.number,
	change: PropTypes.func,
};
export default Persons;
