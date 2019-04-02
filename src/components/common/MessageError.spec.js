import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import MessageError from './MessageError';
import ErrorList from './ErrorList';
// import ListItem from './ListItem';

describe('<MessageError />', () => {

	it('should show us a list of errors', () => {

		// GIVEN
		// A list of items
		const errors = [
			{"key" : 1, "text" : "Please enter foo"},
			{"key" : 2, "text" : "Please enter bar"}
		];

		// WHEN
		// The component is rendered
		const wrapper = shallow(<MessageError
			errors={errors}
		/>);

		// THEN
		// We should have a list
		let items = wrapper.find(ErrorList);
		expect(items).to.be.length(1);

		// AND
		// We should be able to assert that the 
		// number of errors is 2
		// let item = items.find(ListItem);
		// expect(items).to.be.length(2);

	});

});