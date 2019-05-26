import React from 'react';
import './UserInput.css';

const UserInput = props => {
	const placeholder = 'Enter something here';
	return (
		<div>
			<input
				className="UserInput"
				type="text"
				onChange={props.event}
				value={props.username}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default UserInput;
