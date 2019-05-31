import React, { Component } from 'react';
import styles from './App.module.css';
import Person from './Person/Person';

class App extends Component {
	state = {
		persons: [
			{
				id: 'aaa21',
				name: 'Eliad',
				age: 27,
			},
			{
				id: '1bbb2',
				name: 'Jakob',
				age: 27,
			},
			{
				id: 'cc3c1',
				name: 'Ada',
				age: 21,
			},
		],
		showPersons: false,
	};

	clickHandler = () => {
		let showPersonBool = this.state.showPersons;
		this.setState({
			showPersons: !showPersonBool,
		});
	};

	handleDelete = index => {
		const persons = [...this.state.persons];
		persons.splice(index, 1);
		this.setState({ persons: persons });
	};

	handleChange = (e, id) => {
		const personIndex = this.state.persons.findIndex(el => el.id === id);
		const person = { ...this.state.persons[personIndex] };
		person.name = e.target.value;
		const persons = [...this.state.persons];
		persons[personIndex] = person;
		this.setState({
			persons: persons,
		});
	};

	render() {
		let persons = null;
		let buttonClass = '';
		if (this.state.showPersons) {
			persons = (
				<div>
					{this.state.persons.map((person, index) => {
						return (
							<Person
								key={person.id}
								name={person.name}
								age={person.age}
								click={() => this.handleDelete(index)}
								change={event =>
									this.handleChange(event, person.id)
								}
							/>
						);
					})}
				</div>
			);
			buttonClass = styles.Red;
		}

		const classes = [];

		if (this.state.persons.length <= 2) classes.push(styles.setRed);
		if (this.state.persons.length <= 1) classes.push(styles.bold);

		return (
			<div className={styles.App}>
				<h1 className={classes.join(' ')}>Hi, I'm a React App</h1>
				<button onClick={this.clickHandler} className={buttonClass}>
					Toggle Persons!
				</button>
				{persons}
			</div>
		);
	}
}

export default App;
