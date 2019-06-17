import React, { Component } from 'react';
import axiosInstance from '../../../axios-orders';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import requestMessageComponent from '../../requestMessageComponent/requestMessageComponent';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};
class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 3,
		isPurchasable: false,
		isInOrderSummary: false,
		isLoadingRequest: false,
		isErrorOnMount: false,
	};

	// Get the Ingredient list and quantity from the database:
	async componentDidMount() {
		try {
			const getIngredientsData = await axiosInstance.get(
				'/ingredients.json'
			);
			this.setState({
				ingredients: getIngredientsData.data,
			});
		} catch (error) {
			this.setState({
				isErrorOnMount: true,
			});
		}
	}

	checkIfPurchasable = () => {
		const ingredientsCopy = [...this.state.ingredients];
		const checkBool = ingredientsCopy.some(
			ingredient => ingredient.quantity > 0
		);

		this.setState(() => {
			return {
				isPurchasable: checkBool,
			};
		});
	};

	handleOrderButtonClick = () => {
		return this.setState({
			isInOrderSummary: true,
		});
	};

	handleModalOuterBorderClick = () => {
		return this.setState({
			isInOrderSummary: false,
		});
	};

	handleCheckoutButtonClick = async () => {
		this.setState({ isLoadingRequest: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Eliad',
				address: {
					street: 'Test 1',
					zipCode: '12345',
					city: 'Taipei',
				},
				eliad: 'text@testmail.com',
			},
			deliveryMethod: 'fastest',
		};
		try {
			const postRequest = await axiosInstance.post('/orders.json', order);
			console.log(postRequest);
			this.setState({ isLoadingRequest: false, isInOrderSummary: false });
		} catch (error) {
			this.setState({ isLoadingRequest: false, isInOrderSummary: false });
		}
	};

	handleAddIngredientClick = type => {
		const ingredientIndex = this.state.ingredients.findIndex(
			el => el.ingredient === type
		);

		const incrementQuantity =
			[...this.state.ingredients][ingredientIndex].quantity + 1;

		const newIngredients = [...this.state.ingredients];
		newIngredients[ingredientIndex].quantity = incrementQuantity;

		const priceAddition =
			INGREDIENT_PRICES[
				[...this.state.ingredients][ingredientIndex].ingredient
			];

		this.setState(prevState => {
			return {
				ingredients: newIngredients,
				totalPrice: prevState.totalPrice + priceAddition,
			};
		});

		this.checkIfPurchasable();
	};

	handleRemoveIngredientClick = type => {
		const ingredientIndex = this.state.ingredients.findIndex(
			el => el.ingredient === type
		);

		const decrementQuantity =
			[...this.state.ingredients][ingredientIndex].quantity - 1;

		const newIngredients = [...this.state.ingredients];
		newIngredients[ingredientIndex].quantity = decrementQuantity;

		const priceDeduction =
			INGREDIENT_PRICES[
				[...this.state.ingredients][ingredientIndex].ingredient
			];

		this.setState(prevState => {
			return {
				ingredients: newIngredients,
				totalPrice: prevState.totalPrice - priceDeduction,
			};
		});

		this.checkIfPurchasable();
	};

	render() {
		// state destructuring
		const {
			ingredients,
			totalPrice,
			isPurchasable,
			isInOrderSummary,
			isLoadingRequest,
			isErrorOnMount,
		} = this.state;

		// Check if an ingredient quantity is currently 0
		let isQuantityZero;
		if (ingredients) {
			isQuantityZero = [...ingredients].map(el => el.quantity <= 0);
		}

		// If getting database request error, display message:
		const errorMessage = (
			<p>
				Oh no! We've encountered an error, ingredients can't be loaded
			</p>
		);

		return (
			<>
				<Modal
					show={isInOrderSummary}
					closeModalHandler={this.handleModalOuterBorderClick}
				>
					{isLoadingRequest ? (
						<Spinner />
					) : (
						<OrderSummary
							checkoutHandler={this.handleCheckoutButtonClick}
							closeModalHandler={this.handleModalOuterBorderClick}
							ingredients={ingredients}
							price={totalPrice}
						/>
					)}
				</Modal>
				{isErrorOnMount ? errorMessage : null}
				{!ingredients ? (
					<Spinner />
				) : (
					<>
						<Burger ingredients={ingredients} />
						<BuildControls
							addIngredient={this.handleAddIngredientClick}
							removeIngredient={this.handleRemoveIngredientClick}
							disableRemove={isQuantityZero}
							price={totalPrice}
							purchasable={isPurchasable}
							setPurchaseMode={this.handleOrderButtonClick}
						/>
					</>
				)}
			</>
		);
	}
}

export default requestMessageComponent(BurgerBuilder, axiosInstance);
