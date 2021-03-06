import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './NewPost.css';

class NewPost extends Component {
	state = {
		title: '',
		content: '',
		author: 'Max',
		// isRedirecting: false,
	};

	handlePostDataClick = async () => {
		const newPost = {
			title: this.state.title,
			body: this.state.content,
			author: this.state.author,
		};

		try {
			const response = await axios.post('/posts', newPost);
			console.log(response.data);
			// Redirecting conditionally (Only after a click was made and the post submitted):
			this.props.history.push('/posts');
			// this.setState({
			// 	// isRedirecting: true,
			// });
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<div className="NewPost">
				{/* To redirect conditionally using state and the Redirect object: {this.state.isRedirecting ? <Redirect to="/posts" /> : null} */}
				<h1>Add a Post</h1>
				<label>Title</label>
				<input
					type="text"
					value={this.state.title}
					onChange={event =>
						this.setState({ title: event.target.value })
					}
				/>
				<label>Content</label>
				<textarea
					rows="4"
					value={this.state.content}
					onChange={event =>
						this.setState({ content: event.target.value })
					}
				/>
				<label>Author</label>
				<select
					value={this.state.author}
					onChange={event =>
						this.setState({ author: event.target.value })
					}
				>
					<option value="Max">Max</option>
					<option value="Manu">Manu</option>
				</select>
				<button onClick={this.handlePostDataClick}>Add Post</button>
			</div>
		);
	}
}

export default NewPost;
