import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { postPurchasedBurger } from './store/actions';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import OrderFormTemplate from './OrderFormTemplate/OrderFormTemplate';
import axiosInstance from '../../../axios/axios-orders';
import requestMessageComponent from '../../hoc/requestMessageComponent/requestMessageComponent';
import FormErrorMessage from '../../UI/FormErrorMessage/FormErrorMessage';
import styles from './ContactData.module.css';
import PropTypes from 'prop-types';

export const ContactData = ({
	ingredients,
	totalPrice,
	isLoadingRequest,
	email,
	isLoggedIn,
	userId,
	idToken,
	onOrderClick,
	history,
}) => {
	// state hooks:
	const [ingredientsArr] = useState(ingredients);
	const [price] = useState(totalPrice);
	const [orderForm, setOrderForm] = useState(OrderFormTemplate);
	const [isFormValid, setIsFormValid] = useState(false);
	const [showFormInvalidMessage, setShowFormInvalidMessage] = useState(false);

	// If a user is logged in, set the email value to the user email by default
	const setEmailIfLoggedIn = () => {
		if (isLoggedIn && email) {
			const orderorderFormCopy = [...orderForm];
			orderorderFormCopy[2].value = email;
			orderorderFormCopy[2].validation.valid = true;
			orderorderFormCopy[2].validation.hasUserInput = true;
		}
	};
	setEmailIfLoggedIn();

	const handleOrderSubmitClick = async event => {
		event.preventDefault();

		if (!isFormValid) {
			setShowFormInvalidMessage(true);
			return;
		}

		const orderorderFormCopy = [...orderForm];
		const order = {
			userId: userId,
			ingredients: ingredientsArr,
			price: price,
			customer: {
				name: orderorderFormCopy[0].value,
				phone: orderorderFormCopy[1].value,
				email: orderorderFormCopy[2].value,
				address: orderorderFormCopy[3].value,
				postal: orderorderFormCopy[4].value,
				requests: orderorderFormCopy[6].value,
			},
			deliveryMethod: orderorderFormCopy[5].value,
		};

		onOrderClick(order, history.replace, idToken);
	};

	const handleFormChange = (event, data) => {
		let updatedForm = [...orderForm];
		let updatedFormData = updatedForm.forEach(el =>
			el.data === data
				? ((el.value = event.target.value),
				  (el.validation.valid = checkInputValidation(
						el.value,
						el.validation,
						el.data
				  )),
				  (el.validation.hasUserInput = true))
				: el
		);
		updatedForm.value = updatedFormData;

		setOrderForm(updatedForm);
	};

	const checkFormValidation = () => {
		const orderFormCopy = [...orderForm];
		const checkValid = orderFormCopy.every(el => el.validation.valid);

		setIsFormValid(checkValid);
	};

	const checkInputValidation = (value, validation, type) => {
		let isValid = true;
		if (validation.required) isValid = value.trim() !== '' && isValid;

		// Check the email field specifically:
		if (validation.required && type === 'email')
			isValid = validation.emailValidationRegExp.test(value);

		checkFormValidation();
		return isValid;
	};
	// CSS Modules styles:
	const { ContactData } = styles;

	return (
		<div className={ContactData}>
			<h3>Enter your contact information:</h3>
			{isLoadingRequest && isFormValid ? (
				<Spinner />
			) : (
				<form action="post" onSubmit={handleOrderSubmitClick}>
					{orderForm.map((form, i) => (
						<Input
							key={form.data}
							focused={i === 0}
							elementType={form.elementType}
							elementConfig={form.elementConfig}
							validation={{ ...form.validation }}
							value={form.value}
							handleChange={event =>
								handleFormChange(event, form.data)
							}
							handleEnterPress={handleOrderSubmitClick}
						/>
					))}
				</form>
			)}
			<Button
				type={showFormInvalidMessage ? 'Danger' : 'Confirm'}
				handleClick={handleOrderSubmitClick}
			>
				Confirm Order
			</Button>
			{showFormInvalidMessage && (
				<FormErrorMessage errorType="emptyFields" />
			)}
		</div>
	);
};

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
