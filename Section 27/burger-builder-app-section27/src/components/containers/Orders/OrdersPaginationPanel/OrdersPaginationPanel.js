import React from 'react';
import styles from './OrdersPaginationPanel.module.css';
import Icon from '../../../UI/Icon/Icon';
import {
	faAngleRight,
	faAngleLeft,
	faAngleDoubleRight,
	faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';

const OrdersPaginationPanel = ({ children }) => {
	// CSS Modules styles:
	const { OrderPaginationPanel } = styles;

	return (
		<div className={OrderPaginationPanel}>
			<button>
				<Icon iconType={faAngleDoubleLeft} size="2x" />
			</button>
			<button>
				<Icon iconType={faAngleLeft} size="2x" />
			</button>
			{children}
			<button>
				<Icon iconType={faAngleRight} size="2x" />
			</button>
			<button>
				<Icon iconType={faAngleDoubleRight} size="2x" />
			</button>
		</div>
	);
};

export default OrdersPaginationPanel;
