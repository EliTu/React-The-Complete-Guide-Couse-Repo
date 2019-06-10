import React from 'react';
import styles from './Controller.module.css';

const Controller = props => {
	return (
		<div className={styles.Controller}>
			<div className={styles.Label}>{props.label}</div>
			<button
				className={styles.Less}
				onClick={props.clickRemove}
				disabled={props.DisableRemoveButton}
			>
				Less
			</button>
			<button className={styles.More} onClick={props.clickAdd}>
				More
			</button>
		</div>
	);
};

export default Controller;
