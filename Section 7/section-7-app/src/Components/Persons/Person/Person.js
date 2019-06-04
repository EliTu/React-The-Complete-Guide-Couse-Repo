import React, { Component } from 'react';
import './Person.css';
import styles from './Person.module.css';

class Person extends Component {
	render() {
		console.log('Person.js rendering...');
		const { name, age, click, children, change } = this.props;

		return (
			<React.Fragment className={styles.Person}>
				<p onClick={click}>
					I'm {name}, I'm {age} years old
				</p>
				<p>{children}</p>
				<input type="text" onChange={change} value={name} />
			</React.Fragment>
		);
	}
}

export default Person;
