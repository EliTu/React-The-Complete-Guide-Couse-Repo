import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = props => {
	return (
		<header className="Navbar">
			<nav>
				<ul>
					<li>
						<NavLink to="/" exact>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to={{
								pathname: `/new-post`,
								hash: '#submit',
								search: '?quick-submit=true',
							}}
							exact
						>
							New Post
						</NavLink>
					</li>
					<li>
						<NavLink to="/about" exact>
							About
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default withRouter(Navbar);
