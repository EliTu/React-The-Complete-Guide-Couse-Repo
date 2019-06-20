import React, { Component } from 'react';
import { Link, withRouter, Route } from 'react-router-dom';
import Post from '../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import axiosInstance from '../../axios';
import './Posts.css';
import Spinner from '../../components/Spinner/Spinner';

export class Posts extends Component {
	state = {
		posts: [],
		selectedId: true,
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
		});
	};

	render() {
		const { posts, selectedId } = this.state;
		const { match } = this.props;

		return posts.length === 0 && !selectedId ? (
			<Spinner />
		) : (
			<div>
				<section className="Posts">
					{posts.map((post, i) => {
						return i <= 10 ? (
							<Link to={`${match.url}/${post.id}`} key={post.id}>
								<Post
									click={() =>
										this.handlePostClick(
											post.id,
											post.title,
											post.body
										)
									}
									title={post.title}
									author={post.author}
								/>
							</Link>
						) : null;
					})}
				</section>
				<Route path={match.url + '/:id'} component={FullPost} />
			</div>
		);
	}
}

export default withRouter(Posts);
