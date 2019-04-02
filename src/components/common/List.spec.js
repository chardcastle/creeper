import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import List from './List';
import ListItem from './ListItem';

describe('<List />', () => {

	it('should show us a list', () => {

	// GIVEN
	// A list of items
	const ingredients = [
		{"id" : 1, "text" : "Tofu"},
		{"id" : 2, "text" : "Quiona"},
		{"id" : 3, "text" : "Beans"}
	];

	// WHEN
	// The component is rendered
	const wrapper = shallow(<List
		items={ingredients}
	/>);

	// THEN
	// We should have a list
	const items = wrapper.find(ListItem);
		expect(items).to.be.length(3);
	});

});