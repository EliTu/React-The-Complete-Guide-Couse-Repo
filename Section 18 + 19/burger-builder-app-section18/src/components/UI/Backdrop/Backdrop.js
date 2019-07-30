import React from 'react';
import styles from './Backdrop.module.css';
import PropTypes from 'prop-types';

const Backdrop = props => {
	// props:
	const { show, removeBackdrop } = props;

	// CSS Modules styles:
	const { Backdrop } = styles;

	return show ? <div className={Backdrop} onClick={removeBackdrop} /> : null;
};

Backdrop.propTypes = {
	show: PropTypes.bool,
	removeBackdrop: PropTypes.func,
};

export default Backdrop;
