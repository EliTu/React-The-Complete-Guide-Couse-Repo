import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import NewPost from '../NewPost/NewPost';
import './Blog.css';
import FullPost from '../FullPost/FullPost';
import Navbar from '../Navbar/Navbar';
import About from '../../components/About/About';
import { Route } from 'react-router-dom';
// import axios from 'axios';

class Blog extends Component {
	render() {
		return (
			<div className="Blog">
				<Navbar />
				<Route path="/" exact component={Posts} />
				<Route path="/new-post" exact component={NewPost} />
				<Route path="/about" exact component={About} />
				<Route path="/:id" exact component={FullPost} />
			</div>
		);
	}
}

export default Blog;
