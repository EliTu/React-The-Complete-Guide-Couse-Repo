import React from 'react';
import styles from './Controller.module.css';
import PropTypes from 'prop-types';

const Controller = props => {
	// props:
	const { label, clickRemove, DisableRemoveButton, clickAdd } = props;

	// CSS Modules styles:
	const { Controller, Label, Less, More } = styles;

	return (
		<div className={Controller}>
			<div className={Label}>{label}: </div>
			<button
				className={Less}
				onClick={clickRemove}
				disabled={DisableRemoveButton}
			>
				-
			</button>
			<button className={More} onClick={clickAdd}>
				+
			</button>
		</div>
	);
};

Controller.prototypes = {
	label: PropTypes.string,
	clickRemove: PropTypes.func,
	DisableRemoveButton: PropTypes.bool,
	clickAdd: PropTypes.func,
};

export default Controller;
