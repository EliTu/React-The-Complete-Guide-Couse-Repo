import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
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
				<BuildControls />
			</>
		);
	}
	static propTypes = {};
}

export default BurgerBuilder;
