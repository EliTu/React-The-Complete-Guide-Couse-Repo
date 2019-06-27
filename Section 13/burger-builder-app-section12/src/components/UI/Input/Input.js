import React from 'react';
import styles from './Input.module.css';
import PropTypes from 'prop-types';

const Input = props => {
	// props:
	const {
		elementType,
		elementConfig,
		value,
		handleChange,
		isInvalid,
		errorMessage,
		hasUserInput,
	} = props;

	// CSS Modules styles:
	const { Input, InvalidStyle, errorMessageStyle } = styles;

	let inputElement = null;
	let errorMessageElement = (
		<p className={errorMessageStyle}>{errorMessage}</p>
	);

	switch (elementType) {
		case 'input':
			inputElement = (
				<input
					className={isInvalid && hasUserInput ? InvalidStyle : null}
					{...elementConfig}
					value={value}
					onChange={handleChange}
				/>
			);
			break;

		case 'textarea':
			inputElement = (
				<textarea
					{...elementConfig}
					value={value}
					onChange={handleChange}
				/>
			);
			break;

		case 'select':
			inputElement = (
				<select value={value} onChange={handleChange}>
					{elementConfig.options.map(option => (
						<option value={option.value} key={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;

		default:
			inputElement = (
				<input
					{...elementConfig}
					value={value}
					className={isInvalid ? InvalidStyle : null}
				/>
			);
	}
	return (
		<div className={Input}>
			<label>{elementConfig.label}</label>
			{inputElement}
			{isInvalid && hasUserInput ? errorMessageElement : null}
		</div>
	);
};

Input.propTypes = {
	elementType: PropTypes.string,
	elementConfig: PropTypes.object,
	isInvalid: PropTypes.bool,
	errorMessage: PropTypes.string,
	hasUserInput: PropTypes.bool,
	handleChange: PropTypes.func,
};

export default Input;
