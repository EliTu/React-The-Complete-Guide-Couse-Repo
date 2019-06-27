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
	} = props;

	// CSS Modules styles:
	const { Input, InvalidStyle } = styles;

	let inputElement = null;

	switch (elementType) {
		case 'input':
			inputElement = (
				<input
					className={isInvalid ? InvalidStyle : null}
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
				<select
					value={value}
					onChange={handleChange}
					className={isInvalid ? InvalidStyle : null}
				>
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
		</div>
	);
};

Input.propTypes = {
	isInvalid: PropTypes.bool,
	elementType: PropTypes.string,
	elementConfig: PropTypes.object,
	handleChange: PropTypes.func,
};

export default Input;
