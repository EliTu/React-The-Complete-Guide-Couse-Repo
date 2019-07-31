import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AuthItems } from './AuthItems';
import Item from '../Item/Item';

configure({ adapter: new Adapter() });

describe('AuthItems', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<AuthItems />);
	});

	it('Should render 2 <Item> if the user is not signed in', () => {
		wrapper.setProps({ isLoggedIn: false });

		expect(wrapper.find(Item)).toHaveLength(2);
		expect(wrapper.find(Item)).not.toHaveLength(3);
		expect(wrapper.find(Item)).not.toBeFalsy();
	});

	it('should render 1 <Item></Item> and if user is signed in ', () => {
		wrapper.setProps({ isLoggedIn: true });

		expect(wrapper.find(Item)).toHaveLength(1);
		expect(wrapper.find(Item)).not.toHaveLength(2);
		expect(wrapper.find(Item)).not.toBeFalsy();
	});

	it('should contain an <Item>Log out</Item> if the user is authenticated and logged in', () => {
		wrapper.setProps({ isLoggedIn: true });

		expect(wrapper.find(Item)).toBeTruthy();
		expect(
			wrapper.contains(
				<Item signOutItem link="">
					Log out
				</Item>
			)
		).toEqual(true);
	});
});
