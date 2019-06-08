import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
// import PropTypes from 'prop-types';

class BurgerBuilder extends Component {
	state = {
		ingredients: [
			{ ingredient: 'salad', quantity: 0 },
			{ ingredient: 'meat', quantity: 0 },
			{ ingredient: 'cheese', quantity: 0 },
			{ ingredient: 'bacon', quantity: 0 },
		],
		totalPrice: 0,
	};

	render() {
		const { ingredients } = this.state;
		return (
			<>
				<Burger ingredients={ingredients} />
				<div>Build controls</div>
			</>
		);
	}
	static propTypes = {};
}

export default BurgerBuilder;
