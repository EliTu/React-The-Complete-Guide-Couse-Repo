import React from 'react';
import './CharComponent.css';

const CharComponent = props => {
	return (
		<div className="CharComponent" onClick={props.click}>
			{props.children}
		</div>
	);
};

export default CharComponent;
