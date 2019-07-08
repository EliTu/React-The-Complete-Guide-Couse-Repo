import React, { Component } from 'react';
import { connect } from 'react-redux';
import axiosInstance from '../../../axios-orders';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import requestMessageComponent from '../../requestMessageComponent/requestMessageComponent';
import * as actions from './store/actions';

class BurgerBuilder extends Component {
	_isMounted = false;

	state = {
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
		});
	};

	render() {
		// state:
		const {
			isPurchasable,
			isInOrderSummary,
			isLoadingRequest,
			isErrorOnMount,
		} = this.state;

		// props (mapped from redux):
		const {
			ingredients,
			totalPrice,
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

const { addIngredient, removeIngredient } = actions;

const mapDispatchToProps = dispatch => {
	return {
		handleAddIngredientClick: ingName => dispatch(addIngredient(ingName)),
		handleRemoveIngredientClick: ingName =>
			dispatch(removeIngredient(ingName)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(requestMessageComponent(BurgerBuilder, axiosInstance));
