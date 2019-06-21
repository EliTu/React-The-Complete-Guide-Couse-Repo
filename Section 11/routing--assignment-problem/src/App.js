import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Courses from './containers/Courses/Courses';
import PageNotFound from './containers/PageNotFound/PageNotFound';
// import Course from './containers/Course/Course';
import Users from './containers/Users/Users';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div>
					<ul className="Nav">
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/courses">Courses</NavLink>
						</li>
						<li>
							<NavLink to="/users">Users</NavLink>
						</li>
					</ul>
				</div>
				<div>
					<Switch>
						<Route path="/users" exact component={Users} />
						<Route path="/courses" component={Courses} />
						<Redirect from="/" to="/courses" />
						<Route component={PageNotFound} />
						{/* <Route path="/courses/:id" exact component={Course} /> */}
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
