import React from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = props => {
	return <div className={styles.Modal}>{props.children}</div>;
};

Modal.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default Modal;
