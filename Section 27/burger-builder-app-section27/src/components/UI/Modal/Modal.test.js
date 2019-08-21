import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import { shallow } from 'enzyme';

import Modal from './Modal';

describe('<Modal />', () => {
	// const component = setShallowAsComponent(<Modal />);
	let component;
	beforeEach(() => {
		component = shallow(<Modal />);
	});

	it('should render without errors', () => {
		expect(component).toBeTruthy();
		expect(component.length).toBe(1);
		expect(component.length).not.toBe(2);
	});

	it('should render the Backdrop component if mounted', () => {
		expect(component.find(Backdrop)).toBeTruthy();
		expect(component.find(Backdrop)).toHaveLength(1);
		expect(component.find(Backdrop)).not.toHaveLength(2);
	});

	it('should render the children props without errors', () => {
		expect(component.children()).toBeTruthy();
		expect(component.children()).not.toHaveLength(0);
	});
});
