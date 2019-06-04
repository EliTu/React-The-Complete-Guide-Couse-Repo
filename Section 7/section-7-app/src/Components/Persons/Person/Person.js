import React, { Component } from 'react';
import './Person.css';
import styles from './Person.module.css';
import WithClass from '../../../Containers/HigherOrderComponents/WithClass';

class Person extends Component {
	render() {
		console.log('Person.js rendering...');
		const { name, age, click, children, change } = this.props;

		return (
			<WithClass classes={styles.Person}>
				<p onClick={click}>
					I'm {name}, I'm {age} years old
				</p>
				<p>{children}</p>
				<input type="text" onChange={change} value={name} />
			</WithClass>
		);
	}
}

export default Person;
