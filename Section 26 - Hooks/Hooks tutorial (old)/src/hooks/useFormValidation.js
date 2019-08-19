import { useState } from 'react';

export const useFormValidation = () => {
	const [value, setValue] = useState('');
	const [isValid, setIsValid] = useState(false);

	const handleFormInputChange = e => {
		console.log(e);
		setValue(e.target.value);
		e.target.value.trim() !== '' && value.length >= 1
			? setIsValid(true)
			: setIsValid(false);
	};

	return { value: value, onChange: handleFormInputChange, isValid };
};
