import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Login from './Login';

describe.skip('User login', () => {

  it('should have a form with a class of \'form-signin\'', () => {
      const wrapper = shallow(<Login />);
      const actual = wrapper.find('h2').prop('className');
      expect(actual).to.equal('form-signin');
  });

  it('should log a known user in');

});