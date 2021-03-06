import React, { Component } from 'react';
import styles from './App.module.css';
import Persons from '../Components/Persons/Persons';
import Head from '../Components/Head/Head';
import WithClass from '../Containers/HigherOrderComponents/WithClass';
import PropTypes from 'prop-types';
import AuthContext from './Context/AuthContext';

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
		changedCounter: 0,
		authenticated: false,
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
		this.setState((prevState, props) => {
			return {
				persons: persons,
				changedCounter: prevState.changedCounter + 1,
			};
		});
		console.log(this.state.changedCounter);
	};

	removeHead = () => {
		this.setState({
			showHead: false,
		});
	};

	handleLoginClick = () => {
		this.setState({
			authenticated: !this.state.authenticated,
		});
	};

	render() {
		console.log('App.js render');

		return (
			<WithClass classes={styles.App}>
				<button onClick={this.removeHead}>Remove</button>
				<AuthContext.Provider
					value={{
						authenticated: this.state.authenticated,
						login: this.handleLoginClick,
					}}
				>
					{this.state.showHead && (
						<Head
							title={this.props.title}
							personsLength={this.state.persons.length}
							showPersons={this.state.showPersons}
							click={this.clickHandler}
							//loginClick={this.handleLoginClick}
						/>
					)}
					{this.state.showPersons && (
						<Persons
							persons={this.state.persons}
							deleteClick={this.handleDelete}
							changeName={this.handleChange}
							//isAuthenticated={this.state.authenticated}
						/>
					)}
				</AuthContext.Provider>
			</WithClass>
		);
	}
}

App.propTypes = {
	title: PropTypes.string,
};
export default App;
