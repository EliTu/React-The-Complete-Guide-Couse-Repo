import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<Person name="Eliad" age="27">
					is a Future Programmer
				</Person>
				<Person name="Jakob" age="27">
					is a Future MD
				</Person>
				<Person name="Ada" age="21" />
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
