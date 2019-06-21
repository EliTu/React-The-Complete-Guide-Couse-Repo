import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';

class Course extends Component {
	state = {
		title: null,
	};

	getQueryString = () => {
		const title = queryString.parse(this.props.location.search);
		this.setState({
			title: title.title,
		});
	};

	componentDidMount() {
		this.getQueryString();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.getQueryString();
		}
	}

	render() {
		const { match } = this.props;
		const { title } = this.state;

		return (
			<div>
				<h1>{title}</h1>
				<p>You selected the Course with ID: {match.params.id} </p>
			</div>
		);
	}
}

Course.propTypes = {
	match: PropTypes.object,
};

export default withRouter(Course);
