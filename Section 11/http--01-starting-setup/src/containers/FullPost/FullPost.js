import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import PropTypes from 'prop-types';
import './FullPost.css';

class FullPost extends Component {
	state = {
		loadedPost: null,
	};

	getApiData = () => {
		if (this.props.match.params.id) {
			if (
				!this.state.loadedPost ||
				(this.state.loadedPost &&
					this.state.loadedPost.id !== this.props.match.params.id)
			) {
				axios
					.get('/posts/' + this.props.match.params.id)
					.then(response => {
						this.setState({ loadedPost: response.data });
					});
			}
		}
	};

	componentDidMount() {
		this.getApiData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState === this.state) this.getApiData();
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
		const { loadedPost } = this.state;
		let post = <Spinner />;
		if (loadedPost) {
			post = (
				<div className="FullPost">
					<h1>{loadedPost.title}</h1>
					<p>{loadedPost.body}</p>
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
