import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Post.css';

const post = props => {
	const { title, author, click } = props;

	return (
		<article className="Post" onClick={click}>
			<h3>{title}</h3>
			<div className="Info">
				<div className="Author">{author}</div>
			</div>
		</article>
	);
};

post.Proptypes = {
	title: PropTypes.string,
	author: PropTypes.string,
	click: PropTypes.func.isRequired,
};

post.defaultProps = {
	author: 'Unknown',
};

export default withRouter(post);
