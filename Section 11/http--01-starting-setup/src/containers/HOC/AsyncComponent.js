import React, { Component } from 'react';

const AsyncComponent = importComponent => {
	return class extends Component {
		state = {
			component: null,
		};

		componentDidMount() {
			importComponent().then(importedComp => {
				this.setState({
					component: importedComp.default,
				});
			});
		}

		render() {
			const ReturnedComponent = this.state.component;

			return ReturnedComponent ? (
				<ReturnedComponent {...this.props} />
			) : null;
		}
	};
};

export default AsyncComponent;
