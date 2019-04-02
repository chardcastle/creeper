import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import UserList from './UserList';
import UserItem from './UserItem';

describe('<UserList />', () => {

  const users = {users: [
    {id: 1, company: "foo", full_name:"a", data: {}, isFetching: false},
    {id: 2, full_name:"b", data: {}, isFetching: true},
    {id: 3, company: "baz", full_name:"c", data: {}, isFetching: true}
  ]};

  it('should render a list of users', () => {
    const wrapper = shallow(<UserList users={users} />);
    expect(wrapper.find(UserItem)).to.have.lengthOf(0);
  });

});
