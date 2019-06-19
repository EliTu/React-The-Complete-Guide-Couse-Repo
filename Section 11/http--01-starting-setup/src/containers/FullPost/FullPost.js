import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './FullPost.css';

class FullPost extends Component {
	state = {
		loadedPost: null,
	};

	componentDidMount() {
		if (this.props.match.params.id) {
			if (
				!this.state.loadedPost ||
				(this.state.loadedPost &&
					this.state.loadedPost.id !== this.props.id)
			) {
				axios
					.get('/posts/' + this.props.match.params.id)
					.then(response => {
						this.setState({ loadedPost: response.data });
					});
			}
		}
	}

	handleDeletePostClick = async () => {
		try {
			const deletePost = await axios.delete(
				`/posts/${this.props.match.params.id}`
			);
			console.log(deletePost);
		} catch (error) {
			this.setState({ error: 'Something went wrong!' });
			console.log(error);
		}
	};

	render() {
		let post = <p style={{ textAlign: 'center' }}>Loading</p>;
		if (this.state.loadedPost) {
			post = (
				<div className="FullPost">
					<h1>{this.state.loadedPost.title}</h1>
					<p>{this.state.loadedPost.body}</p>
					<div className="Edit">
						<button
							onClick={this.handleDeletePostClick}
							className="Delete"
						>
							Delete
						</button>
					</div>
				</div>
			);
		}
		return post;
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
