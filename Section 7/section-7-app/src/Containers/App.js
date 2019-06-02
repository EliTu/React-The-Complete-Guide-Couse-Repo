import React, { Component } from 'react';
import styles from './App.module.css';
import Persons from '../Components/Persons/Persons';
import Head from '../Components/Head/Head';

class App extends Component {
	constructor(props) {
		super(props);
		console.log('App.js constructor');
	}

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
		showHead: true,
	};

	// Component creation Lifecycle hooks:
	static getDerivedStateFromProps(props, state) {
		console.log('App.js getDerviedSatateFRomProps', props);
		return state;
	}

	componentDidMount() {
		console.log('App.js componentDidMount');
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('App.js shouldComponentUpdate');
		return this.state !== nextState;
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('App.js componentDidUpdate');
	}

	// Event handlers:
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

	removeHead = () => {
		this.setState({
			showHead: false,
		});
	};

	render() {
		console.log('App.js render');

		return (
			<div className={styles.App}>
				<button onClick={this.removeHead}>Remove</button>
				{this.state.showHead && (
					<Head
						title={this.props.title}
						persons={this.state.persons}
						showPersons={this.state.showPersons}
						click={this.clickHandler}
					/>
				)}
				{this.state.showPersons && (
					<Persons
						persons={this.state.persons}
						deleteClick={this.handleDelete}
						changeName={this.handleChange}
					/>
				)}
			</div>
		);
	}
}

export default App;
