import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = props => {
	// props:
	const { children, handleClick, type } = props;

	// CSS Modules styles:
	const { Button } = styles;

	return (
		<button
			onClick={handleClick}
			className={[Button, styles[type]].join(' ')}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	handleClick: PropTypes.func,
	type: PropTypes.string,
};

export default Button;
