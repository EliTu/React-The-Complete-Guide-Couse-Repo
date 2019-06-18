import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../NewPost/NewPost';
import './Blog.css';
import Navbar from '../Navbar/Navbar';
// import axios from 'axios';
import axiosInstance from '../../axios';

class Blog extends Component {
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
		const {
			posts,
			selectedId,
			selectedTitle,
			selectedContent,
		} = this.state;

		return (
			<div style={{ margin: 0, padding: 0, height: 100 + '%' }}>
				<Navbar />
				<section className="Posts" />
			</div>
		);
	}
}

export default Blog;

/*
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
				<section>
					<FullPost
						postId={selectedId}
						title={selectedTitle}
						content={selectedContent}
					/>
				</section>
				<section>
					<NewPost />
*/
