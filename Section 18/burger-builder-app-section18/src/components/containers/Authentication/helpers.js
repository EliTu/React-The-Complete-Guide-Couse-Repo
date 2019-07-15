export const checkFormValidation = form => {
	const formCopy = [...form];
	return formCopy.every(el => el.validation.valid);
};

export const checkInputValidation = (value, validation, type) => {
	let isValid = true;
	if (validation.required) isValid = value.trim() !== '' && isValid;

	// Check the email field specifically:
	if (validation.required && type === 'email')
		isValid = validation.emailValidationRegExp.test(value);

	checkFormValidation();
	return isValid;
};
