/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { resetAuth } from './../actions/auth';
// import { fetchGroupsIfNeeded } from './../actions/groupActions';
import MessageError from './common/MessageError';

// Since this component is simple and static, there's no parent container for it.
class GroupsPage extends Component
{

    /**
     * Log user out to clear states
     * from previous login etc...
     *
     * Removes access token
     *
     * @param props
     */
    constructor(props)
    {
        super(props);
        // the id value is derived from user/:id in the routes.js
        // this.props.dispatch(getUser({userId: this.props.params.id}));
        // console.log(result);
    }

    componentDidMount()
    {
        this.props.fetchGroupsIfNeeded({userId: this.props.params.id});
    }

    render()
    {
        const { groups } = this.props;

        let groupsView;
        if (groups.isFetching) {
            groupsView = (<img src="/images/loading.gif" alt="" />);
        } else if (groups.isFailed) {
            groupsView = (
                <MessageError title="System Error"
                  message={groups.systemError}
                  isVisible={true} />
            );
        } else if (groups.isInvalid) {
            groupsView = (
                <MessageError title="Error invalid"
                  errors="Couldn't load user"
                  isVisible={true} />
            );
        } else if (groups.isSuccess) {
            groupsView =  (
                <p>Got groups</p>
            );
        }

        return (
            <div>
                {groupsView}
            </div>
        );
    }

}

function mapStateToProps(state) {
    const { getGroupsData } = state;

    return {
        groups: getGroupsData
    };
}

// function mapDispatchToProps(dispatch) {
function mapDispatchToProps() {
    return {
        getGroups:() => {
            // dispatch(getGroups());
        }  
    };
}

GroupsPage.propTypes = {
    fetchGroupsIfNeeded: React.PropTypes.func,
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    groups: React.PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupsPage);
