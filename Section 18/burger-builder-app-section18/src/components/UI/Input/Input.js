import React, { useRef, useEffect } from 'react';
import styles from './Input.module.css';
import PropTypes from 'prop-types';

const Input = props => {
	// props:
	const {
		elementType,
		elementConfig,
		value,
		validation,
		focused,
		handleChange,
		handleEnterPress,
	} = props;

	// CSS Modules styles:
	const { Input, InvalidStyle, errorMessageStyle } = styles;

	let inputElement = null;
	let errorMessageElement = (
		<p className={errorMessageStyle}>{validation.errorMessage}</p>
	);

	// Listen to keyboard enter click to submit form:
	const enterPressCallback = (event, func) => {
		if (event.key === 'Enter') func(event);
	};

	// Focus the first input field upon component mount
	const focusRef = useRef();
	useEffect(() => {
		if (focused) focusRef.current.focus();
	}, [focused]);

	switch (elementType) {
		case 'input':
			inputElement = (
				<input
					ref={focusRef}
					className={
						!validation.valid && validation.hasUserInput
							? InvalidStyle
							: null
					}
					{...elementConfig}
					value={value}
					onChange={handleChange}
					onKeyPress={event =>
						enterPressCallback(event, handleEnterPress)
					}
				/>
			);
			break;

		case 'textarea':
			inputElement = (
				<textarea
					{...elementConfig}
					value={value}
					onChange={handleChange}
					onKeyPress={event =>
						enterPressCallback(event, handleEnterPress)
					}
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
					className={!validation.valid ? InvalidStyle : null}
					onKeyPress={event =>
						enterPressCallback(event, handleEnterPress)
					}
				/>
			);
	}
	return (
		<div className={Input}>
			<label>{elementConfig.label}</label>
			{inputElement}
			{!validation.valid && validation.hasUserInput
				? errorMessageElement
				: null}
		</div>
	);
};

Input.propTypes = {
	elementType: PropTypes.string,
	elementConfig: PropTypes.object,
	validation: PropTypes.object,
	focused: PropTypes.bool,
	handleChange: PropTypes.func,
	handleEnterPress: PropTypes.func,
};

export default Input;
