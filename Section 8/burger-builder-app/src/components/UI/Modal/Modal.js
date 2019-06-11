import React from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = props => {
	// props:
	const { children, show } = props;

	// CSS Modules styles:
	const { Modal } = styles;

	// Set conditional inline styles:
	const translateModal = show ? 'translateX(0)' : 'translateX(100vh)';
	const adjustOpacity = show ? '1' : '0';

	return (
		<div
			className={Modal}
			style={{
				transform: translateModal,
				opacity: adjustOpacity,
			}}
		>
			{children}
		</div>
	);
};

Modal.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	show: PropTypes.bool,
};

export default Modal;
