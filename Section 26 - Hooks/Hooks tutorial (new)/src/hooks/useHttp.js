import { useState, useCallback } from 'react';

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleHttpRequest = useCallback(
		async (url, httpVerb, httpBody, ing, dispatchFn) => {
			setIsLoading(true);
			try {
				const { name: firebaseId } = await fetch(url, {
					method: `${httpVerb}`,
					body: httpBody,
					headers: { 'Content-Type': 'application/json' },
				}).then(response => {
					setIsLoading(false);
					console.log(response);
					return response.json();
				});

				return firebaseId;
			} catch (error) {
				console.log(error);
				setIsLoading(false);
				error && setIsError(true);
				setErrorMessage('Server error!');
			}
		},
		[]
	);

	const handleErrorClear = () => {
		setIsError(false);
		setErrorMessage('');
	};

	return [
		isLoading,
		isError,
		errorMessage,
		handleHttpRequest,
		handleErrorClear,
	];
};

export default useHttp;
