import React, { Component } from 'react';
import logo from './logo.svg';
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
	};

	clickHandler = newName => {
		this.setState({
			persons: [
				{
					name: newName,
					age: 27,
				},
				{
					name: 'JB',
					age: 27.5,
				},
				{
					name: 'Ada Chen',
					age: 21,
				},
			],
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
				<button
					onClick={() => this.clickHandler('Eli T')}
					style={buttonStyle}
				>
					Switch name!
				</button>
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
				<img
					src={logo}
					alt="React logo"
					style={{ height: 300, width: 300 }}
				/>
			</div>
		);
	}
}

export default App;
