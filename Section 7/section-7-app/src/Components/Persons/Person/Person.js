import React from 'react';
import './Person.css';
import styles from './Person.module.css';

const Person = props => {
	console.log('Person.js rendering...');
	return (
		<div className={styles.Person}>
			<p onClick={props.click}>
				I'm {props.name}, I'm {props.age} years old
			</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.change} value={props.name} />
		</div>
	);
};

export default Person;
