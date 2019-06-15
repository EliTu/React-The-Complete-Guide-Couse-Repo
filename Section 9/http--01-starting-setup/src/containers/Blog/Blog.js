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
		axios.get('https://jsonplaceholder.typicode.com/posts').then(response =>
			this.setState({
				posts: response.data,
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
