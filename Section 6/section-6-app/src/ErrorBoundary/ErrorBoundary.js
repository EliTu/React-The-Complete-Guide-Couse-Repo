import React, { Component } from 'react';

export class ErrorBoundary extends Component {
	state = {
		hasError: false,
		errorMessage: '',
	};
	render() {
		this.componentDidCatch = (error, info) => {
			this.setState({
				hasError: true,
				errorMessage: error,
			});
		};
		if (this.state.hasError) {
			return <h1>Something is wrong!</h1>;
		} else {
			return this.props.children;
		}
	}
}

export default ErrorBoundary;
