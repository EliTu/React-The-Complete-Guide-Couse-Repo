import React from 'react';
import styles from './Input.module.css';
import PropTypes from 'prop-types';

const Input = props => {
	// props:
	const { elementType, elementConfig, value } = props;
	// CSS Modules styles:
	const { Input } = styles;

	let inputElement = null;

	switch (elementType) {
		case 'input':
			inputElement = <input {...elementConfig} value={value} />;
			break;
		case 'textarea':
			inputElement = <textarea {...elementConfig} value={value} />;
			break;
		default:
			inputElement = <input {...elementConfig} value={value} />;
	}
	return (
		<div className={Input}>
			<label>{}</label>
			{inputElement}
		</div>
	);
};

Input.propTypes = {
	elementType: PropTypes.string,
	elementConfig: PropTypes.object,
};

export default Input;
