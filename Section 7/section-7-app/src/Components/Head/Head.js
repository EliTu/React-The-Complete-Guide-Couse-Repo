import React, { useEffect } from 'react';
import styles from './Head.module.css';
import PropTypes from 'prop-types';

const Head = props => {
	let buttonClass = '';
	let classes = [];

	if (props.showPersons) buttonClass = styles.Red;

	if (props.personsLength <= 2) classes.push(styles.setRed);
	if (props.personsLength <= 1) classes.push(styles.bold);
	if (props.personsLength === 0) classes.pop();

	useEffect(() => {
		console.log('Head.js useEffect');
		setTimeout(() => {
			console.log('Saved data');
		}, 1000);
		return () => {
			console.log('Head.js cleanup work');
		};
	}, []);

	return (
		<div className={styles.Head}>
			<h1 className={classes.join(' ')}>{props.title}</h1>
			<button onClick={() => props.click()} className={buttonClass}>
				Toggle Persons!
			</button>
		</div>
	);
};

Head.propTypes = {
	personLength: PropTypes.number,
	showPersons: PropTypes.bool,
	click: PropTypes.func,
	title: PropTypes.string,
};

export default React.memo(Head);
