import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
	return (
		<header className="Navbar">
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link
							to={{
								pathname: '/new-post',
								hash: '#submit',
								search: '?quick-submit=true',
							}}
						>
							New Post
						</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
