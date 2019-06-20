import React, { Component } from 'react';
import AsyncComponent from '../HOC/AsyncComponent';
import Navbar from '../Navbar/Navbar';
import Posts from '../Posts/Posts';
// import NewPost from '../NewPost/NewPost';
// import About from '../../components/About/About';
import './Blog.css';
import { Route, Switch, Redirect } from 'react-router-dom';
// import axios from 'axios';

// Code splitting (Pre 16.6 way):
const LazyNewPost = AsyncComponent(() => import('../NewPost/NewPost'));
const LazyAbout = AsyncComponent(() => import('../../components/About/About'));

class Blog extends Component {
	state = {
		isAuthenticated: true,
	};
	render() {
		return (
			<div className="Blog">
				<Navbar />
				<Switch>
					<Route path="/posts" component={Posts} />
					{this.state.isAuthenticated ? (
						<Route path="/new-post" exact component={LazyNewPost} />
					) : null}
					<Route path="/about" exact component={LazyAbout} />
					<Redirect from="/" to="/posts" />
					{/*To catch 404 errors when routing: <Route render={() => <h1>Page not found :(</h1>} /> */}
				</Switch>
			</div>
		);
	}
}

export default Blog;
