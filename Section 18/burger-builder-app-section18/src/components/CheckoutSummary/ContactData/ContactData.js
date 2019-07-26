import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postPurchasedBurger } from './store/actions';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import OrderFormData from './OrderFormData/OrderFormData';
import axiosInstance from '../../../axios/axios-orders';
import requestMessageComponent from '../../requestMessageComponent/requestMessageComponent';
import FormErrorMessage from '../../UI/FormErrorMessage/FormErrorMessage';
import styles from './ContactData.module.css';
import PropTypes from 'prop-types';

export class ContactData extends Component {
	state = {
		ingredients: this.props.ingredients,
		totalPrice: this.props.totalPrice,
		orderForm: OrderFormData,
		isFormValid: false,
		showFormInvalidMessage: false,
	};

	componentDidMount() {
		// If a user is logged in, set the email value to the user email by default
		if (this.props.isLoggedIn && this.props.email) {
			const orderFormCopy = [...this.state.orderForm];
			orderFormCopy[2].value = this.props.email;
			orderFormCopy[2].validation.valid = true;
			orderFormCopy[2].validation.hasUserInput = true;

			this.setState({
				orderForm: orderFormCopy,
			});
		}
	}

	handleOrderSubmitClick = async event => {
		event.preventDefault();

		if (!this.state.isFormValid) {
			this.setState({
				showFormInvalidMessage: true,
			});
			return;
		}

		const orderData = [...this.state.orderForm];
		const order = {
			userId: this.props.userId,
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: orderData[0].value,
				phone: orderData[1].value,
				email: orderData[2].value,
				address: orderData[3].value,
				postal: orderData[4].value,
				requests: orderData[6].value,
			},
			deliveryMethod: orderData[5].value,
		};

		this.props.onOrderClick(
			order,
			this.props.history.replace,
			this.props.idToken
		);
		console.log(order);
	};

	handleFormChange = (event, data) => {
		let updatedForm = [...this.state.orderForm];
		let updatedFormData = updatedForm.forEach(el =>
			el.data === data
				? ((el.value = event.target.value),
				  (el.validation.valid = this.checkInputValidation(
						el.value,
						el.validation,
						el.data
				  )),
				  (el.validation.hasUserInput = true))
				: el
		);
		updatedForm.value = updatedFormData;

		this.setState({
			orderForm: updatedForm,
		});
	};

	checkFormValidation = () => {
		const formCopy = [...this.state.orderForm];
		const checkValid = formCopy.every(el => el.validation.valid);

		this.setState({
			isFormValid: checkValid,
		});
	};

	checkInputValidation = (value, validation, type) => {
		let isValid = true;
		if (validation.required) isValid = value.trim() !== '' && isValid;

		// Check the email field specifically:
		if (validation.required && type === 'email')
			isValid = validation.emailValidationRegExp.test(value);

		this.checkFormValidation();
		return isValid;
	};

	render() {
		// local state:
		const { orderForm, isFormValid, showFormInvalidMessage } = this.state;

		// props (from redux):
		const { isLoadingRequest } = this.props;

		// CSS Modules styles:
		const { ContactData } = styles;

		return (
			<div className={ContactData}>
				<h3>Enter your contact information:</h3>
				{isLoadingRequest && isFormValid ? (
					<Spinner />
				) : (
					<form action="post" onSubmit={this.handleOrderSubmitClick}>
						{orderForm.map((form, i) => (
							<Input
								key={form.data}
								focused={i === 0}
								elementType={form.elementType}
								elementConfig={form.elementConfig}
								validation={{ ...form.validation }}
								value={form.value}
								handleChange={event =>
									this.handleFormChange(event, form.data)
								}
								handleEnterPress={this.handleOrderSubmitClick}
							/>
						))}
					</form>
				)}
				<Button
					type={showFormInvalidMessage ? 'Danger' : 'Confirm'}
					handleClick={this.handleOrderSubmitClick}
				>
					Confirm Order
				</Button>
				{showFormInvalidMessage ? (
					<FormErrorMessage errorType="emptyFields" />
				) : null}
			</div>
		);
	}
}

ContactData.propTypes = {
	ingredients: PropTypes.array,
	totalPrice: PropTypes.number,
	isLoadingRequest: PropTypes.bool,
	onOrderClick: PropTypes.func,
	idToken: PropTypes.string,
	isLoggedIn: PropTypes.bool,
	email: PropTypes.string,
	userId: PropTypes.string,
};

// Redux setup:
const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		isLoadingRequest: state.orderForm.isLoading,
		idToken: state.auth.idToken,
		isLoggedIn: state.auth.isLoggedIn,
		email: state.auth.email,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderClick: (order, redirectBack, idToken) =>
			dispatch(postPurchasedBurger(order, redirectBack, idToken)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(requestMessageComponent(ContactData, axiosInstance));
