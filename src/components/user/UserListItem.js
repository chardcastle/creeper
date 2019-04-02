/**
 * Created by chrishardcastle on 04/06/2017.
 */
import React from 'react';
import UserItem from './UserItem';

export default class UserListItem extends React.Component
{

    constructor (props)
    {
        super(props);
    }

    render () {
        const user = this.props;
        return (
            <div className="col-xs-6 col-sm-3">
                {this.props.user &&
                    <UserItem user={user.user}/>
                }

                {user.user.isFetching &&
                    <div style={{height: '350px'}}>
                        <img src="/images/loading.gif" key={user.toString()} alt="" />
                    </div>
                }
            </div>
        );
    }
}

UserListItem.propTypes = {
    user: React.PropTypes.object
};
