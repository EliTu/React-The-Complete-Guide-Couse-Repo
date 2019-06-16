import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FullPost.css';

class FullPost extends Component {
	render() {
		const { postId, title, content } = this.props;
		let post = <p className="Select">Please select a Post!</p>;

		return !postId
			? post
			: (post = (
					<div className="FullPost">
						<h1>{title}</h1>
						<p>{content}</p>
						<div className="Edit">
							<button className="Delete">Delete</button>
						</div>
					</div>
			  ));
	}
}

FullPost.propTypes = {
	postId: PropTypes.number,
	title: PropTypes.string,
	content: PropTypes.string,
};
FullPost.defafultProps = {
	title: 'Title',
	content: 'Content',
};
export default FullPost;
