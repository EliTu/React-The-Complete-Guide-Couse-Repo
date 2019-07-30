import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavItems } from './NavItems';
import Item from '../Item/Item';

configure({ adapter: new Adapter() });

describe('<NavItems/>', () => {
	it('should by default render 3 nav <Item/> components (as long as user not authenticated)', () => {
		const wrapper = shallow(<NavItems />);
		expect(wrapper.find(Item)).toHaveLength(3);
	});
});
