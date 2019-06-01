import React from 'react';
import styles from './Head.module.css';

const Head = props => {
	let buttonClass = '';
	const classes = [];

	if (props.showPersons) buttonClass = styles.Red;

	if (props.persons.length <= 2) classes.push(styles.setRed);
	if (props.persons.length <= 1) classes.push(styles.bold);

	return (
		<div className={styles.Head}>
			<h1 className={classes.join(' ')}>{props.title}</h1>
			<button onClick={() => props.click()} className={buttonClass}>
				Toggle Persons!
			</button>
		</div>
	);
};

export default Head;
