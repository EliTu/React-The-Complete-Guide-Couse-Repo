import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
	state = {
		userInput: 'Hi',
	};

	handleChange = event => {
		const userInput = event.target.value;
		this.setState({
			userInput: userInput,
		});
	};

	handleClick = i => {
		const currentInput = [...this.state.userInput.split('')];
		currentInput.splice(i, 1);
		this.setState({
			userInput: currentInput.join(''),
		});
	};

	render() {
		const inputLength = this.state.userInput.length;
		const characters = this.state.userInput.split('').map((char, i) => {
			return (
				<CharComponent
					className="charComp"
					key={i}
					click={() => this.handleClick(i)}
				>
					{char}
				</CharComponent>
			);
		});
		const spanStyle = {
			fontSize: '1.3rem',
			color: `${inputLength < 5 ? 'tomato' : 'lightgreen'}`,
			transition: '0.4s all',
		};

		return (
			<div className="App">
				<h1>Assignment 2</h1>
				<input
					type="text"
					onChange={event => this.handleChange(event)}
					value={this.state.userInput}
				/>
				<ValidationComponent length={inputLength} />
				<p className="lengthDisplay">
					The input length is{' '}
					<span style={spanStyle}>{inputLength}</span>
				</p>
				{characters}
			</div>
		);
	}
}

export default App;
