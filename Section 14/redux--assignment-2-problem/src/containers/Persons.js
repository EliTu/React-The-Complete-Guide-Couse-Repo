import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/action';
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import PropTypes from 'prop-types';

class Persons extends Component {
	render() {
		const {
			persons,
			handleAddUserClick,
			handleRemoveUserClick,
		} = this.props;

		return (
			<div>
				<AddPerson personAdded={handleAddUserClick} />
				{persons.map(person => (
					<Person
						key={person.id}
						name={person.name}
						age={person.age}
						clicked={() => handleRemoveUserClick(person.id)}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		persons: state.persons,
	};
};

const mapDispatchToProps = dispatch => {
	const { ADD_PERSON, DEL_PERSON } = actions;

	return {
		handleAddUserClick: (name, age) =>
			dispatch({
				type: ADD_PERSON,
				data: {
					id: Math.random(),
					name: name,
					age: age,
				},
			}),
		handleRemoveUserClick: id => dispatch({ type: DEL_PERSON, id: id }),
	};
};

Persons.PropTypes = {
	persons: PropTypes.array,
	handleAddUserClick: PropTypes.func,
	handleRemoveUserClick: PropTypes.func,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Persons);
