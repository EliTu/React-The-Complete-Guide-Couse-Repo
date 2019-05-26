import React, { Component } from 'react';
import './App.css';
import UserOutput from './UserOutput/UserOutput';
import UserInput from './UserInput/UserInput';

class App extends Component {
	state = {
		usernames: ['ssT112', 'd12345G', 'zzZ66z'],
		stateChangeBool: false,
	};

	handleInputOne = e => {
		this.setState({
			usernames: this.state.usernames.map(el =>
				this.state.usernames.indexOf(el) === 0
					? (el = e.target.value)
					: el
			),
			stateChangeBool: true,
		});
	};

	handleInputTwo = e => {
		this.setState({
			usernames: this.state.usernames.map(el =>
				this.state.usernames.indexOf(el) === 1
					? (el = e.target.value)
					: el
			),
			stateChangeBool: true,
		});
	};

	handleInputThree = e => {
		this.setState({
			usernames: this.state.usernames.map(el =>
				this.state.usernames.indexOf(el) === 2
					? (el = e.target.value)
					: el
			),
			stateChangeBool: true,
		});
	};

	render() {
		// Styles
		const headingStyle = {
			color: 'dodgerblue',
			fontSize: '3rem',
			margin: '10px auto',
		};

		const containerStyle = {
			display: 'flex',
			flexDirection: 'column',
			alignContent: 'center',
			alignItems: 'center',
			width: '90%',
			border: '2px solid gold',
			borderRadius: '7px',
			margin: '3rem auto',
			padding: '1rem 0 1rem 0',
		};

		// Destructuring data from the state
		const [user1, user2, user3] = [...this.state.usernames];

		return (
			<div className="App" style={containerStyle}>
				<h1 style={headingStyle}>Assignment 1</h1>
				<UserOutput
					username={user1}
					stateChangeBool={
						this.state.stateChangeBool === false ? 'No' : 'Yes'
					}
				/>
				<UserInput event={this.handleInputOne} username={user1} />
				<UserOutput
					username={user2}
					stateChangeBool={
						this.state.stateChangeBool === false ? 'No' : 'Yes'
					}
				/>
				<UserInput event={this.handleInputTwo} username={user2} />
				<UserOutput
					username={user3}
					stateChangeBool={
						this.state.stateChangeBool === false ? 'No' : 'Yes'
					}
				/>
				<UserInput event={this.handleInputThree} username={user3} />
			</div>
		);
	}
}

export default App;
