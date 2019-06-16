import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './FullPost.css';

class FullPost extends Component {
	state = {
		error: null,
	};

	handleDeletePostClick = async () => {
		try {
			const deletePost = await axios.delete(
				`https://jsonplaceholder.typicode.com/posts/${
					this.props.postId
				}`
			);
			console.log(deletePost);
		} catch (error) {
			this.setState({ error: 'Something went wrong!' });
			console.log(error);
		}
	};

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
							<button
								className="Delete"
								onClick={this.handleDeletePostClick}
							>
								Delete
							</button>
							{this.state.error ? (
								<p style={{ color: 'red', fontSize: '20px' }}>
									{this.state.error}
								</p>
							) : null}
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
