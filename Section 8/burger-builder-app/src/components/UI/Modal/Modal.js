import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

const Modal = props => {
	// props:
	const { children, show, closeModalHandler } = props;

	// CSS Modules styles:
	const { Modal } = styles;

	// Set conditional inline styles:
	const translateModal = show ? 'translateX(0)' : 'translateX(100vh)';
	const adjustOpacity = show ? '1' : '0';

	return (
		<>
			<Backdrop show={show} removeBackdrop={closeModalHandler} />
			<div
				className={Modal}
				style={{
					transform: translateModal,
					opacity: adjustOpacity,
				}}
			>
				{children}
			</div>
		</>
	);
};

Modal.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	show: PropTypes.bool.isRequired,
	closeModalHandler: PropTypes.func.isRequired,
};

export default React.memo(Modal);
