import React from 'react';
import styles from './Controller.module.css';
import PropTypes from 'prop-types';

const Controller = props => {
	return (
		<div className={styles.Controller}>
			<div className={styles.Label}>{props.label}: </div>
			<button
				className={styles.Less}
				onClick={props.clickRemove}
				disabled={props.DisableRemoveButton}
			>
				-
			</button>
			<button className={styles.More} onClick={props.clickAdd}>
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
