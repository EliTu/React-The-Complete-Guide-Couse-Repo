import React from 'react';
import './Navbar.css';

const Navbar = () => {
	return (
		<header className="Navbar">
			<nav>
				<ul>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/new-post">New Post</a>
					</li>
					<li>
						<a href="/about">About</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
