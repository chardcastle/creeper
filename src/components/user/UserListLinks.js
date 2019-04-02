/* eslint-disable no-console */
import React from 'react';

class UserListLinks extends React.Component
{

    constructor (props)
    {
        super(props);
    }


    render ()
    {
        const { users } = this.props;

        let listItems;
        let data = Object.keys(users).map(function (key) {
            return users[key];
        });

        listItems = data.map(function(user, i) {
            if (user.isFetching) {
                return (<li><img src="/images/loading.gif" key={i} alt=""/></li>);
            } else if (user.isSuccess && 'undefined' !== typeof user.data) {
                let profileUrl = "/user/" + user.data.reference;
                if (null !== user.data.first_name && user.data.last_name) {
                    return (<li><a href={profileUrl}>{user.data.first_name + ' ' + user.data.last_name}</a></li>);
                } else {
                    return (<li><a href={profileUrl}>Unknown user</a></li>);
                }
            }
        });

        return (
            <ul>
                <h5>Other Smiths</h5>
                <ul>{listItems}</ul>
            </ul>
        );
    }
}

UserListLinks.propTypes = {
    users: React.PropTypes.object
};

export default UserListLinks;
