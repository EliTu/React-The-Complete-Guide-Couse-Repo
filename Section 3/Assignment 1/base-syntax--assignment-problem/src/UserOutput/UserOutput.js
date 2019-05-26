import React from 'react';
import '../UserOutput/UserOutput.css';

const UserOutput = props => {
	const spanStyle = {
		color: props.stateChangeBool === 'No' ? 'red' : 'green',
	};
	return (
		<div className="UserOutput">
			<p>Your username is: {props.username}</p>
			<p>
				Has the state changed?{' '}
				<span style={spanStyle}>{props.stateChangeBool}</span>
			</p>
		</div>
	);
};

export default UserOutput;
