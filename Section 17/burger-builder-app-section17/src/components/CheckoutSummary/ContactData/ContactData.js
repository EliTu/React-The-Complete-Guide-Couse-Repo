import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postPurchasedBurger } from './store/actions';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import OrderFormData from './OrderFormData/OrderFormData';
import axiosInstance from '../../../axios-orders';
import requestMessageComponent from '../../requestMessageComponent/requestMessageComponent';
import styles from './ContactData.module.css';

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

		this.setState({ isLoadingRequest: true });

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
				requests: orderData[5].value,
			},
			deliveryMethod: orderData[6].value,
		};
		console.log(order);

		this.props.onOrderClick(order);
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
		const { ContactData, formInvalidStyle } = styles;

		const formInvalidMessage = (
			<p className={formInvalidStyle}>
				Please fill out all the required form fields first!
			</p>
		);
		console.log(orderForm);

		return (
			<div className={ContactData}>
				<h4>Enter your contact information:</h4>
				{isLoadingRequest && isFormValid ? (
					<Spinner />
				) : (
					<form action="post" onSubmit={this.handleOrderSubmitClick}>
						{orderForm.map(form => (
							<Input
								key={form.data}
								elementType={form.elementType}
								elementConfig={form.elementConfig}
								isInvalid={!form.validation.valid}
								hasUserInput={form.validation.hasUserInput}
								errorMessage={form.validation.errorMessage}
								value={form.value}
								handleChange={event =>
									this.handleFormChange(event, form.data)
								}
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
				{showFormInvalidMessage ? formInvalidMessage : null}
			</div>
		);
	}
}

// Redux setup:
const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
		isLoadingRequest: state.isLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderClick: order => dispatch(postPurchasedBurger(order)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(requestMessageComponent(ContactData, axiosInstance));
