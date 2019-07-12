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
import PropTypes from 'prop-types';

class BurgerBuilder extends Component {
	_isMounted = false;

	state = {
		isPurchasable: false,
		isInOrderSummary: false,
	};

	// Get the Ingredient list and quantity from the database:
	async componentDidMount() {
		this._isMounted = true;
		this.props.initIngredients();
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
		// local state:
		const { isPurchasable, isInOrderSummary } = this.state;

		// props (state mapped from redux):
		const {
			ingredients,
			totalPrice,
			handleAddIngredientClick,
			handleRemoveIngredientClick,
			isLoadingRequest,
			isErrorOnMount,
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

BurgerBuilder.propTypes = {
	ingredients: PropTypes.array,
	totalPrice: PropTypes.number,
	isLoadingRequest: PropTypes.bool,
	isErrorOnMount: PropTypes.bool,
	handleAddIngredientClick: PropTypes.func,
	handleRemoveIngredientClick: PropTypes.func,
	initIngredients: PropTypes.func,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		isLoadingRequest: state.burgerBuilder.isLoadingRequest,
		isErrorOnMount: state.burgerBuilder.isErrorOnMount,
	};
};

const { addIngredient, removeIngredient, fetchIngredients } = actions;

const mapDispatchToProps = dispatch => {
	return {
		handleAddIngredientClick: ingName => dispatch(addIngredient(ingName)),
		handleRemoveIngredientClick: ingName =>
			dispatch(removeIngredient(ingName)),
		initIngredients: () => dispatch(fetchIngredients()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(requestMessageComponent(BurgerBuilder, axiosInstance));
