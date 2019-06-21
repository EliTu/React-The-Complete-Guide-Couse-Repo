import React, { Component } from 'react';
import Course from '../Course/Course';
// import Course from '../Course/Course';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Courses.css';

class Courses extends Component {
	state = {
		courses: [
			{ id: 1, title: 'Angular - The Complete Guide' },
			{ id: 2, title: 'Vue - The Complete Guide' },
			{ id: 3, title: 'PWA - The Complete Guide' },
		],
	};

	render() {
		const { match } = this.props;

		return (
			<div>
				<h1>Amazing Udemy Courses</h1>
				<section className="Courses">
					{this.state.courses.map(course => {
						return (
							<Link
								to={{
									pathname: `${match.url}/${course.id}`,
									search: `?title=${course.title}`,
								}}
								key={course.id}
							>
								<article className="Course">
									{course.title}
								</article>
							</Link>
						);
					})}
				</section>
				<Route path={`${match.url}/:id`} component={Course} />
			</div>
		);
	}
}

Courses.propTypes = {
	match: PropTypes.object,
};

export default Courses;
