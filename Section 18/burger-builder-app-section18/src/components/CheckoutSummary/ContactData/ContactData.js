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

	handleOrderSubmitClick = async event => {
		event.preventDefault();

		if (!this.state.isFormValid) {
			this.setState({
				showFormInvalidMessage: true,
			});
			return;
		}

		// this.setState({ isLoadingRequest: true });

		const orderData = [...this.state.orderForm];
		const order = {
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

		this.props.onOrderClick(order, this.props.history.replace);
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
				<h4>Enter your contact information:</h4>
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
};

// Redux setup:
const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		isLoadingRequest: state.orderForm.isLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderClick: (order, redirectBack) =>
			dispatch(postPurchasedBurger(order, redirectBack)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(requestMessageComponent(ContactData, axiosInstance));
