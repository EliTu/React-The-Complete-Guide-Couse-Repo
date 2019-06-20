import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

// import Posts from './containers/Posts';
// import User from './containers/User';
import Welcome from './containers/Welcome';

const Posts = React.lazy(() => import('./containers/Posts'));
const User = React.lazy(() => import('./containers/User'));

class App extends Component {
	// state = {
	// 	show: false,
	// };
	// handleClick = () => {
	// 	this.setState(prevState => {
	// 		return {
	// 			show: !prevState.show,
	// 		};
	// 	});
	// };
	render() {
		return (
			// 		<React.Fragment>
			// 			<button onClick={this.handleClick}>Toggle</button>
			// 			{this.state.show ? (
			// 				<Suspense fallback={<div>Loading...</div>}>
			// 					<Posts />
			// 				</Suspense>
			// 			) : (
			// 				<Suspense fallback={<div>Loading...</div>}>
			// 					<User />
			// 				</Suspense>
			// 			)}
			// 		</React.Fragment>
			// 	);
			<BrowserRouter>
				<React.Fragment>
					<nav>
						<NavLink to="/user">User Page</NavLink> |&nbsp;
						<NavLink to="/posts">Posts Page</NavLink>
					</nav>
					<Route path="/" component={Welcome} exact />
					<Route
						path="/user"
						render={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<User />
							</Suspense>
						)}
					/>
					<Route
						path="/posts"
						render={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<Posts />
							</Suspense>
						)}
					/>
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
