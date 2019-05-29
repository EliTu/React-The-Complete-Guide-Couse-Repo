import React, { Component } from 'react';
import './App.css';
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
