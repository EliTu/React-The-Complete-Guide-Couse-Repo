import React from 'react';
import styles from './Icon.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ iconType, size = '1x' }) => {
	// CSS Module styles:
	const { Icon } = styles;
	return (
		<span className={Icon}>
			<FontAwesomeIcon icon={iconType} size={size} />
		</span>
	);
};

export default Icon;
