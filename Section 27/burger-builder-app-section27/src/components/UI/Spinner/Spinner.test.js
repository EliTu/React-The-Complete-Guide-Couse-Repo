import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

describe('<Spinner/>', () => {
	let component;
	beforeEach(() => {
		component = shallow(<Spinner />);
	});

	it('should render without errors', () => {
		expect(component.length).toBe(1);
		expect(component.length).not.toBe(2);
	});
});
