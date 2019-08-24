import React from 'react';
import Input from './Input';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../utilities/test-utilities/findByTestAttr';

const onChange = jest.fn();
const onEnterPress = jest.fn();

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
		handleChange: () => {},
		handleEnterPress: () => {},
		data: 'abc',
	};
	return props;
};

const setComponent = (props = {}, changeFn = () => {}, enterFn = () => {}) => {
	const component = shallow(
		<Input {...props} handleChange={changeFn} handleEnterPress={enterFn} />
	);
	return component;
};

describe('<Input/>', () => {
	describe('Component (not testing the input fields)', () => {
		it('should render an Input component withot errors', () => {
			let props = setComponentProps('input', 'text', 'abc', true);
			let component = setComponent(props);
			expect(component).toMatchSnapshot();
			expect(component).toBeTruthy();
			expect(component.length).toBe(1);
			expect(component.length).not.toBe(2);
		});
	});

	describe('Type: input="text" test', () => {
		let props = setComponentProps('input', 'text', 'abc', true);
		let component = setComponent(props);
		let input = findByTestAttr(component, 'input-test');

		it('should render without errors', () => {
			expect(component).toMatchSnapshot();
			expect(input.length).toBe(1);
		});

		it('should not render if elementType is not input ', () => {
			props = setComponentProps('password', 'text', 'abc', true);
			component = setComponent(props);
			input = findByTestAttr(component, 'input-test');

			expect(component).toMatchSnapshot();
			expect(input.length).toBe(0);
		});

		it('should call the onChange event callback function on user input', () => {
			props = setComponentProps('input', 'text', '', true);
			component = setComponent(props, onChange);
			input = findByTestAttr(component, 'input-test');

			input.simulate('change', {
				target: { value: 'abc' },
			});

			expect(onChange).toHaveBeenCalled();
		});

		it('should call the onKeyPress event callback function on user press enter', () => {
			props = setComponentProps('input', 'text', 'abc', true);
			component = setComponent(props, null, onEnterPress);
			input = findByTestAttr(component, 'input-test');

			input.simulate('keypress', { key: 'Enter' });

			expect(onEnterPress).toHaveBeenCalled();
		});
	});

	describe('Type: input="textarea" test', () => {
		let props = setComponentProps('textarea', '', 'abc', true);
		let component = setComponent(props);
		let textarea = findByTestAttr(component, 'textarea-test');
		it('should render without errors', () => {
			expect(component).toMatchSnapshot();
			expect(textarea.length).toBe(1);
			expect(textarea.length).not.toBe(2);
		});

		it('should call the onKeyPress event callback function on user press enter', () => {
			component = setComponent(props, null, onEnterPress);

			textarea.simulate('keypress', { key: 'Enter' });

			expect(onEnterPress).toHaveBeenCalled();
		});
	});
});
