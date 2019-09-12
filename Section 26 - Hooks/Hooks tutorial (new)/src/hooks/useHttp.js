import { useState, useCallback } from 'react';

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleHttpRequest = useCallback(async (url, httpVerb, httpBody) => {
		setIsLoading(true);
		try {
			const dbData = await fetch(url, {
				method: `${httpVerb}`,
				body: httpBody,
				headers: { 'Content-Type': 'application/json' },
			}).then(response => {
				setIsLoading(false);
				if (httpVerb === 'DELETE') return;
				return response.json();
			});

			return dbData;
		} catch (error) {
			setIsLoading(false);
			error && setIsError(true);
			setErrorMessage(error.message);
		}
	}, []);

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
