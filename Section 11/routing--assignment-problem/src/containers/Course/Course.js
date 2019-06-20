import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class Course extends Component {
	componentDidMount() {
		const title = queryString.parse(this.props.location.search, {
			ignoreQueryPrefix: true,
		});
		console.log(title);
	}

	render() {
		const { match, location } = this.props;
		console.log(location);

		return (
			<div>
				<h1>_COURSE_TITLE_</h1>
				<p>You selected the Course with ID: {match.params.id} </p>
			</div>
		);
	}
}

export default withRouter(Course);
