import { useRef, useCallback, useEffect } from 'react';

const useClickOutside = (isDisplayed, closeCallbackFn) => {
	const boxRef = useRef();
	const handleOutsideClick = useCallback(
		event => {
			if (isDisplayed && !boxRef.current.contains(event.target)) {
				closeCallbackFn();
			}
		},
		[closeCallbackFn, isDisplayed]
	);

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);
		return () => document.removeEventListener('click', handleOutsideClick);
	}, [handleOutsideClick]);

	return boxRef;
};

export default useClickOutside;
