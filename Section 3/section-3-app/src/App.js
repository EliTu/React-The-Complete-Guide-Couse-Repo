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

	clickHandler = () => {};

	render() {
		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<button onClick={this.clickHandler}>Switch name!</button>
				<Person
					name={this.state.persons[0].name}
					age={this.state.persons[0].age}
				>
					is a Future Programmer
				</Person>
				<Person
					name={this.state.persons[1].name}
					age={this.state.persons[1].age}
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
