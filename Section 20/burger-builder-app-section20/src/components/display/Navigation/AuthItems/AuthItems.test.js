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
	});

	it('should render 1 <Item></Item> and one <p> tag if user is signed in ', () => {
		wrapper.setProps({ isLoggedIn: true });
		expect(wrapper.find(Item)).toHaveLength(1);
	});

	it('should contain an <Item>Log out</Item> if the user is authenticated and logged in', () => {
		wrapper.setProps({ isLoggedIn: true });
		expect(
			wrapper.contains(
				<Item signOutItem link="">
					Log out
				</Item>
			)
		).toEqual(true);
	});
});
