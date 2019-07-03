import React, { Component } from 'react';
import { connect } from 'react-redux';
import axiosInstance from '../../../axios-orders';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import requestMessageComponent from '../../requestMessageComponent/requestMessageComponent';
import { BurgerBuilderActions } from '../../../store/actions';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	_isMounted = false;

	state = {
		totalPrice: 3,
		isPurchasable: false,
		isInOrderSummary: false,
		isLoadingRequest: false,
		isErrorOnMount: false,
	};

	// Get the Ingredient list and quantity from the database:
	async componentDidMount() {
		this._isMounted = true;
		// 	try {
		// 		const getIngredientsData = await axiosInstance.get(
		// 			'/ingredients.json'
		// 		);
		// 		if (this._isMounted) {
		// 			this.setState({
		// 				ingredients: getIngredientsData.data,
		// 			});
		// 		}
		// 	} catch (error) {
		// 		if (this._isMounted) {
		// 			this.setState({
		// 				isErrorOnMount: true,
		// 			});
		// 		}
		// 	}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.ingredients !== this.props.ingredients) {
			this.checkIfPurchasable();
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	checkIfPurchasable = () => {
		const ingredientsCopy = [...this.props.ingredients];
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

	handleCheckoutButtonClick = () => {
		this.props.history.push({
			pathname: '/checkout',
			state: {
				ingredients: this.props.ingredients,
				price: this.state.totalPrice,
			},
		});
	};

	handleAddIngredientClick = type => {
		const ingredientIndex = this.props.ingredients.findIndex(
			el => el.ingredient === type
		);

		const incrementQuantity =
			[...this.props.ingredients][ingredientIndex].quantity + 1;

		const newIngredients = [...this.props.ingredients];
		newIngredients[ingredientIndex].quantity = incrementQuantity;

		const priceAddition =
			INGREDIENT_PRICES[
				[...this.props.ingredients][ingredientIndex].ingredient
			];

		this.setState(prevState => {
			return {
				ingredients: newIngredients,
				totalPrice: prevState.totalPrice + priceAddition,
			};
		});
	};

	handleRemoveIngredientClick = type => {
		const ingredientIndex = this.props.ingredients.findIndex(
			el => el.ingredient === type
		);

		const decrementQuantity =
			[...this.props.ingredients][ingredientIndex].quantity - 1;

		const newIngredients = [...this.props.ingredients];
		newIngredients[ingredientIndex].quantity = decrementQuantity;

		const priceDeduction =
			INGREDIENT_PRICES[
				[...this.props.ingredients][ingredientIndex].ingredient
			];

		this.setState(prevState => {
			return {
				ingredients: newIngredients,
				totalPrice: prevState.totalPrice - priceDeduction,
			};
		});
	};

	render() {
		// state:
		const {
			totalPrice,
			isPurchasable,
			isInOrderSummary,
			isLoadingRequest,
			isErrorOnMount,
		} = this.state;

		// props (mapped from redux):
		const {
			ingredients,
			handleAddIngredientClick,
			handleRemoveIngredientClick,
		} = this.props;

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
							addIngredient={handleAddIngredientClick}
							removeIngredient={handleRemoveIngredientClick}
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

// Redux setup:
const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
	};
};

const { ADD_INGREDIENT, REMOVE_INGREDIENT } = BurgerBuilderActions;
const mapDispatchToProps = dispatch => {
	return {
		handleAddIngredientClick: ingName =>
			dispatch({ type: ADD_INGREDIENT, ingredientName: ingName }),
		handleRemoveIngredientClick: ingName =>
			dispatch({ type: REMOVE_INGREDIENT, ingredientName: ingName }),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(requestMessageComponent(BurgerBuilder, axiosInstance));
