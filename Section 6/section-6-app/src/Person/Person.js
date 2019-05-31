import React from 'react';
import './Person.css';
import styles from './Person.module.css';

const Person = props => {
	const random = Math.random();
	if (random > 0.7) throw new Error('Something is wrong!');

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
