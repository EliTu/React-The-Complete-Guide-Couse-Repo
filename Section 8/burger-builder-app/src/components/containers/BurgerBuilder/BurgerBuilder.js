import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
// import PropTypes from 'prop-types';

class BurgerBuilder extends Component {
	state = {
		type: '',
	};

	render() {
		return (
			<>
				<Burger />
				<div>Build controls</div>
			</>
		);
	}
	static propTypes = {};
}

export default BurgerBuilder;
