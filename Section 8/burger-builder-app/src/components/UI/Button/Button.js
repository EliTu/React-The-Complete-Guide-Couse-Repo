import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = props => {
	// props:
	const { children, handleClick, type } = props;

	// CSS Modules styles:
	const { Button } = styles;

	return (
		<button onClick={handleClick} className={[Button, Button[type]]}>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default Button;
