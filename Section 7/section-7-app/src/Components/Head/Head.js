import React, { useEffect, useRef, useContext } from 'react';
import styles from './Head.module.css';
import PropTypes from 'prop-types';
import AuthContext from '../../Containers/Context/AuthContext';

const Head = props => {
	const toggleButtonRef = useRef();
	const authContext = useContext(AuthContext);

	let buttonClass = '';
	let classes = [];

	if (props.showPersons) buttonClass = styles.Red;

	if (props.personsLength <= 2) classes.push(styles.setRed);
	if (props.personsLength <= 1) classes.push(styles.bold);
	if (props.personsLength === 0) classes.pop();

	useEffect(() => {
		console.log('Head.js useEffect');
		toggleButtonRef.current.click();
		return () => {
			console.log('Head.js cleanup work');
		};
	}, []);

	return (
		<div className={styles.Head}>
			<h1 className={classes.join(' ')}>{props.title}</h1>
			<button
				onClick={() => props.click()}
				className={buttonClass}
				ref={toggleButtonRef}
			>
				Toggle Persons!
			</button>
			<button onClick={() => authContext.login()}>
				Log {authContext.authenticated ? 'out' : 'in'}
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
