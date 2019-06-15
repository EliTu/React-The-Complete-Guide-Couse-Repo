import React from 'react';
import PropTypes from 'prop-types';

import './Post.css';

const post = props => {
	const { title, author } = props;

	return (
		<article className="Post">
			<h5>{title}</h5>
			<div className="Info">
				<div className="Author">{author}</div>
			</div>
		</article>
	);
};

post.Proptypes = {
	title: PropTypes.string,
	author: PropTypes.string,
};

post.defaultProps = {
	author: 'Unknown',
};

export default post;
