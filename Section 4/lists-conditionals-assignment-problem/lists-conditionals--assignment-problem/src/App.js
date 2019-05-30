import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = {
		userInput: 'Default',
	};

	handleChange = event => {
		const userInput = event.target.value;
		this.setState({
			userInput: userInput,
		});
	};

	render() {
		const inputLength = this.state.userInput.length;
		return (
			<div className="App">
				<input
					type="text"
					onChange={event => this.handleChange(event)}
					value={this.state.userInput}
				/>
				<p>{inputLength}</p>

				<hr />
				<ol style={{ border: `1px solid black`, width: `70%` }}>
					<li>
						Create a new component (=> ValidationComponent) which
						receives the text length as a prop
					</li>
					<li>
						Inside the ValidationComponent, either output "Text too
						short" or "Text long enough" depending on the text
						length (e.g. take 5 as a minimum length)
					</li>
					<li>
						Create another component (=> CharComponent) and style it
						as an inline box (=> display: inline-block, padding:
						16px, text-align: center, margin: 16px, border: 1px
						solid black).
					</li>
					<li>
						Render a list of CharComponents where each CharComponent
						receives a different letter of the entered text (in the
						initial input field) as a prop.
					</li>
					<li>
						When you click a CharComponent, it should be removed
						from the entered text.
					</li>
				</ol>
			</div>
		);
	}
}

export default App;
