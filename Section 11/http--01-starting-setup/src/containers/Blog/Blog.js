import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import NewPost from '../NewPost/NewPost';
import './Blog.css';
import Navbar from '../Navbar/Navbar';
import About from '../../components/About/About';
import { Route } from 'react-router-dom';
// import axios from 'axios';

class Blog extends Component {
	render() {
		return (
			<div>
				<Navbar />
				{/* <Route path="/" exact render={() => <Posts />} /> */}
				<Route path="/" exact component={Posts} />
				<Route path="/new-post" exact component={NewPost} />
				<Route path="/about" exact component={About} />
			</div>
		);
	}
}

export default Blog;
