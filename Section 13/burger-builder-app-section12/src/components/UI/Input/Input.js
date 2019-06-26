import React from 'react';
import styles from './Input.module.css';
import PropTypes from 'prop-types';

const Input = props => {
	// props:
	const { label, inputtype } = props;
	// CSS Modules styles:
	const { Input } = styles;

	let inputElement = null;

	switch (inputtype) {
		case 'input':
			inputElement = <input {...props} />;
			break;
		case 'textarea':
			inputElement = <textarea {...props} />;
			break;
		default:
			inputElement = <input {...props} />;
	}
	return (
		<div className={Input}>
			<label>{label}</label>
			{inputElement}
		</div>
	);
};

Input.propTypes = {
	label: PropTypes.string,
	inputType: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
};

export default Input;
