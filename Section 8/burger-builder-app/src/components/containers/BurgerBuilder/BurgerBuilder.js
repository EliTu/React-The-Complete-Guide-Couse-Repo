import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
// import PropTypes from 'prop-types';

class BurgerBuilder extends Component {
	state = {
		ingredients: [
			{ ingredient: 'salad', quantity: 1 },
			{ ingredient: 'meat', quantity: 2 },
			{ ingredient: 'cheese', quantity: 2 },
			{ ingredient: 'bacon', quantity: 1 },
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
