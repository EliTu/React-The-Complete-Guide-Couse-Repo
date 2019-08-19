import React from 'react';
import styles from './OrdersPaginationPanel.module.css';
import Icon from '../../../UI/Icon/Icon';
import {
	faAngleRight,
	faAngleLeft,
	faAngleDoubleRight,
	faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const OrdersPaginationPanel = ({ pages, pagesNumberClick }) => {
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
			<ul>
				{pages.map(page => (
					<li key={page}>{page}</li>
				))}
			</ul>
			<button>
				<Icon iconType={faAngleRight} size="2x" />
			</button>
			<button>
				<Icon iconType={faAngleDoubleRight} size="2x" />
			</button>
		</div>
	);
};

OrdersPaginationPanel.propTypes = {
	pages: PropTypes.array,
	pagesNumberClick: PropTypes.func,
};

export default OrdersPaginationPanel;
