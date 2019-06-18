import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import FullPost from '../FullPost/FullPost';
import NewPost from '../NewPost/NewPost';
import './Blog.css';
import Navbar from '../Navbar/Navbar';
// import axios from 'axios';

class Blog extends Component {
	state = {
		selectedId: null,
		selectedTitle: '',
		selectedContent: '',
	};

	render() {
		return (
			<div>
				<Navbar />
				<Posts />
			</div>
		);
	}
}

export default Blog;
