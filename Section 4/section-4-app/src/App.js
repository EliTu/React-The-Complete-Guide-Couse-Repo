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

	render() {
		const buttonStyle = {
			backgroundColor: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer',
		};

		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				{this.state.showPersons ? (
					<div>
						<Person
							name={this.state.persons[0].name}
							age={this.state.persons[0].age}
						>
							is a Future Programmer
						</Person>
						<Person
							name={this.state.persons[1].name}
							age={this.state.persons[1].age}
							click={this.clickHandler.bind(this, 'kewliyo')}
							change={this.handleNameChange}
						>
							is a Future MD
						</Person>
						<Person
							name={this.state.persons[2].name}
							age={this.state.persons[2].age}
						/>
					</div>
				) : null}
				<button onClick={this.clickHandler} style={buttonStyle}>
					Toggle Persons!
				</button>
			</div>
		);
	}
}

export default App;
