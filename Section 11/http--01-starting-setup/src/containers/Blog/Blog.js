import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import NewPost from '../NewPost/NewPost';
import './Blog.css';
import Navbar from '../Navbar/Navbar';
import About from '../../components/About/About';
import { Route, Switch, Redirect } from 'react-router-dom';
// import axios from 'axios';

class Blog extends Component {
	render() {
		return (
			<div className="Blog">
				<Navbar />
				<Switch>
					<Route path="/posts" component={Posts} />
					<Route path="/new-post" exact component={NewPost} />
					<Route path="/about" exact component={About} />
					<Redirect from="/" to="/posts" />
				</Switch>
			</div>
		);
	}
}

export default Blog;
