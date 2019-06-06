import React, { Component } from 'react';
import './Person.css';
import styles from './Person.module.css';
import WithClass from '../../../Containers/HigherOrderComponents/WithClass';
import AuthContext from '../../../Containers/Context/AuthContext';

class Person extends Component {
	constructor(props) {
		super(props);
		this.inputElementRef = React.createRef();
	}

	static contextType = AuthContext;

	componentDidMount() {
		this.inputElementRef.current.focus();
		console.log(this.context);
	}

	handleTransitionFade = () => {};

	render() {
		console.log('Person.js rendering...');
		const { name, age, click, children, change } = this.props;

		return (
			<WithClass
				classes={styles.Person}
				ontransitionend={this.handleTransitionFade}
			>
				{this.context.authenticated ? (
					<p className={styles.authenticated}>User Authenticated</p>
				) : (
					<p className={styles.notAuthenticated}>Please log in</p>
				)}
				<p onClick={click}>
					I'm {name}, I'm {age} years old
				</p>
				<p>{children}</p>
				<input
					type="text"
					onChange={change}
					value={name}
					//ref={(inputEl) => {this.inputElement = inputEl}}
					ref={this.inputElementRef}
				/>
			</WithClass>
		);
	}
}

export default Person;
