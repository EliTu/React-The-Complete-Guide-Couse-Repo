import React, { Component } from 'react';
import styles from './App.module.css';
import Persons from '../Components/Persons/Persons';
import Head from '../Components/Head/Head';

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
		if (this.state.showPersons) {
			persons = (
				<Persons
					persons={this.state.persons}
					deleteClick={this.handleDelete}
					changeName={this.handleChange}
				/>
			);
		}

		return (
			<div className={styles.App}>
				<Head
					title={this.props.title}
					persons={this.state.persons}
					showPersons={this.state.showPersons}
					click={this.clickHandler}
				/>
				{persons}
			</div>
		);
	}
}

export default App;
