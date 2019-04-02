/* eslint-disable no-console */
import React from 'react';
import ListItem from './UserListItem';

class UserList extends React.Component
{

    constructor (props)
    {
        super(props);
    }

    render ()
    {
        const users = Object.keys(this.props.users).map((user, index) =>
            <div key={user.toString()}>
                {index % 3 === 0 &&
                    <div className="clearfix visible-xs" />
                }

                {this.props.users[index] &&
                    <ListItem key={user.toString()} user={this.props.users[index]}/>
                }
            </div>
        );

        return (
            <div className="row">{users}</div>
        );
    }
}

UserList.propTypes = {
    users: React.PropTypes.object.isRequired
};

export default UserList;
