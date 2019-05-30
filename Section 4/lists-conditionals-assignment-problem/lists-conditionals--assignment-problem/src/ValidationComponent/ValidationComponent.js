import React from 'react';

const ValidationComponent = props => {
	const style = {
		fontSize: '1.4rem',
		color: `${props.length >= 5 ? 'tomato' : 'lightgreen'}`,
		transition: '0.4s all',
	};

	const lengthCheck =
		props.length >= 5 ? <p>Text too long!</p> : <p> Text too short!</p>;
	return <div style={style}>{lengthCheck}</div>;
};

export default ValidationComponent;
