import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import AboutPage from './AboutPage';

describe('<AboutPage />', () => {
  it('should have a header called \'About\'', () => {
    const wrapper = shallow(<AboutPage />);
    const actual = wrapper.find('h2').text();
    const expected = 'Private page';

    expect(actual).to.equal(expected);
  });

});
