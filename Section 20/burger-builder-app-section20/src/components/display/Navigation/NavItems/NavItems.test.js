import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavItems } from './NavItems';
import Item from '../Item/Item';

configure({ adapter: new Adapter() });

describe('<NavItems/>', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavItems />);
	});

	it('should render 3 nav <Item/> components (as long as user not authenticated)', () => {
		expect(wrapper.find(Item)).toHaveLength(3);
		expect(wrapper.find(Item)).not.toHaveLength(2);
		expect(wrapper.find(Item)).not.toBeFalsy();
	});

	it('should render 4 nav <Item/> components if the user is authenticated and logged in', () => {
		wrapper.setProps({ isLoggedIn: true });

		expect(wrapper.find(Item)).toHaveLength(4);
		expect(wrapper.find(Item)).not.toHaveLength(3);
		expect(wrapper.find(Item)).not.toBeFalsy();
	});
});
