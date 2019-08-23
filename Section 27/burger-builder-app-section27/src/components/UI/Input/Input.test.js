import React from 'react';
import Input from './Input';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../utilities/test-utilities/findByTestAttr';

const setComponentProps = (elemType, configType, value, isValid) => {
	const props = {
		elementType: `${elemType}`,
		elementConfig: {
			type: `${configType}`,
			placeholder: 'abc',
			label: 'abc',
		},
		value: `${value}`,
		validation: {
			required: true,
			hasUserInput: false,
			valid: `${isValid}`,
			errorMessage: 'abc',
		},
		focused: true,
		handleChange: () => [],
		handleEnterPress: () => [],
		data: 'abc',
	};
	return props;
};

const setComponent = (props = {}) => {
	const component = shallow(<Input {...props} />);
	return component;
};

describe('<Input/>', () => {
	describe('Component (not testing the input fields)', () => {
		let props = setComponentProps('input', 'text', 'abc', true);
		let component = setComponent(props);
		expect(component).toBeTruthy();
		expect(component.length).toBe(1);
		expect(component.length).not.toBe(2);
	});

	describe('Type: input="text" test', () => {
		it('should render without errors', () => {
			let props = setComponentProps('input', 'text', 'abc', true);
			let component = setComponent(props);
			let input = findByTestAttr(component, 'input-test');
			expect(input.length).toBe(1);
		});
		
		it('should not render if elementType is not input ', () => {
			let props = setComponentProps('password', 'text', 'abc', true);
			let component = setComponent(props);
			let input = findByTestAttr(component, 'input-test');
			expect(input.length).toBe(0);
		});
	});
});
