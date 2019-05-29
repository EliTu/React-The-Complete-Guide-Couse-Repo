import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
	state = {
		persons: [
			{
				name: 'Eliad',
				age: 27,
			},
			{
				name: 'Jakob',
				age: 27,
			},
			{
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

	handleNameChange = e => {
		this.setState({
			persons: [
				{
					name: 'Eliad',
					age: 27,
				},
				{
					name: e.target.value,
					age: 27.5,
				},
				{
					name: 'Ada Chen',
					age: 21,
				},
			],
		});
	};

	handleDelete = index => {
		const persons = [...this.state.persons];
		persons.splice(index, 1);
		this.setState({ persons: persons });
	};

	render() {
		const buttonStyle = {
			backgroundColor: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer',
		};

		let persons = this.state.showPersons ? (
			<div>
				{this.state.persons.map((person, index) => {
					return (
						<Person
							name={person.name}
							age={person.age}
							click={() => this.handleDelete(index)}
						/>
					);
				})}
			</div>
		) : null;

		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				{persons}
				<button onClick={this.clickHandler} style={buttonStyle}>
					Toggle Persons!
				</button>
			</div>
		);
	}
}

export default App;
