import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
	state = {
		posts: [],
	};

	componentDidMount() {
		const postRequest = async () => {
			const posts = await axios.get(
				'https://jsonplaceholder.typicode.com/posts'
			);
			const users = await axios.get(
				'https://jsonplaceholder.typicode.com/users'
			);
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

	render() {
		const { posts } = this.state;

		return (
			<div>
				<section className="Posts">
					{posts.map((post, i) => {
						return i <= 10 ? (
							<Post
								key={post.id}
								title={post.title}
								author={post.author}
							/>
						) : null;
					})}
				</section>
				<section>
					<FullPost />
				</section>
				<section>
					<NewPost />
				</section>
			</div>
		);
	}
}

export default Blog;
