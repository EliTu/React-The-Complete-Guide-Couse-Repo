import React, { Component } from 'react';
import './Person.css';
import styles from './Person.module.css';
import WithClass from '../../../Containers/HigherOrderComponents/WithClass';

class Person extends Component {
	constructor(props) {
		super(props);
		this.inputElementRef = React.createRef();
	}

	componentDidMount() {
		this.inputElementRef.current.focus();
	}

	render() {
		console.log('Person.js rendering...');
		const {
			name,
			age,
			click,
			children,
			change,
			isAuthenticated,
		} = this.props;

		return (
			<WithClass classes={styles.Person}>
				{isAuthenticated ? (
					<p>User Authenticated</p>
				) : (
					<p>Please log in</p>
				)}
				<p onClick={click}>
					I'm {name}, I'm {age} years old
				</p>
				<p>{children}</p>
				<input
					type="text"
					onChange={change}
					value={name}
					//ref={(inputEl) => {this.inputElement = inputEl}}
					ref={this.inputElementRef}
				/>
			</WithClass>
		);
	}
}

export default Person;
