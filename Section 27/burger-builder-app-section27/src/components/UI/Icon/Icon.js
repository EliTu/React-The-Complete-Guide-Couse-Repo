import React from 'react';
import styles from './Icon.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ iconType }) => {
	// CSS Module styles:
	const { Icon } = styles;
	return (
		<span className={Icon}>
			<FontAwesomeIcon icon={iconType} />
		</span>
	);
};

export default Icon;
