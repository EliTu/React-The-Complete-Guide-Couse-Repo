import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import axiosInstance from '../../axios';
import './Posts.css';

export class Posts extends Component {
	state = {
		posts: [],
		selectedId: null,
		selectedTitle: '',
		selectedContent: '',
	};

	componentDidMount() {
		const postRequest = async () => {
			const posts = await axiosInstance.get('/posts');
			const users = await axiosInstance.get('/users');
			const postsData = posts.data;
			const usersData = users.data;

			let tempPostData;
			const newPostData = [];

			postsData.forEach(post => {
				usersData.forEach(user => {
					if (post.id === user.id) {
						tempPostData = post;
						tempPostData.author = user.name;
						newPostData.push(tempPostData);
					}
				});
			});

			console.log(newPostData);

			return newPostData;
		};

		postRequest().then(data =>
			this.setState({
				posts: data,
			})
		);
	}

	handlePostClick = (postId, postTitle, postContent) => {
		this.setState({
			selectedId: postId,
			selectedTitle: postTitle,
			selectedContent: postContent,
		});
	};

	render() {
		const { posts } = this.state;

		return (
			<section className="Posts">
				{posts.map((post, i) => {
					return i <= 10 ? (
						<Post
							click={() =>
								this.handlePostClick(
									post.id,
									post.title,
									post.body
								)
							}
							key={post.id}
							title={post.title}
							author={post.author}
						/>
					) : null;
				})}
			</section>
		);
	}
}

export default Posts;
