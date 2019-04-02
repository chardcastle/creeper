/* eslint-disable no-console */
/* noinspection JSUnusedGlobalSymbols */
import { browserHistory } from 'react-router';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { Breadcrumb/*, Item */ } from 'react-bootstrap';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { getProfiles } from './../actions/profileActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetAuth } from './../actions/auth';
import { fetchUserIfNeeded } from './../actions/userActions';
import MessageError from './common/MessageError';
import UserListLinks from './user/UserListLinks';
import UserView from './user/UserView';
const profilesPerPage = 4;

// Since this component is simple and static, there's no parent container for it.
class UserPage extends Component
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
        this.placeCall = this.placeCall.bind(this);

        this.state = {
            profiles: {}
        };
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    componentDidMount()
    {
        this.props.fetchUserIfNeeded({userId: this.props.params.id});
    }

    componentWillReceiveProps(nextProps)
    {
        const { profiles } = nextProps;

        this.setState({
            profiles: profiles
        });
    }

    placeCall(event)
    {
        console.log('Sup bud?');
        event.preventDefault();
    }

    render()
    {
        const { user, profiles } = this.props;

        let userView;

        if (user.isFetching)
        {
            userView = (<img src="/images/loading.gif" alt="" />);
        } else if (user.isFailed) {
            userView = (
                <MessageError title="System Error"
                              message={user.systemError}
                              isVisible={true} />
            );
        } else if (user.isInvalid) {
            userView = (
                <MessageError title="Error invalid"
                              errors="Couldn't load user"
                              isVisible={true} />
            );
        } else if (user.isSuccess) {
            userView = <UserView user={user} />;
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => {browserHistory.push('/');}} href="#">
                            Home
                        </Breadcrumb.Item>
                        {window.history.length > 0 &&
                            <Breadcrumb.Item onClick={() => {
                                browserHistory.goBack();
                            }}>
                                Back
                            </Breadcrumb.Item>
                        }
                        {'undefined' !== typeof user.data &&
                            <Breadcrumb.Item active>
                                {user.data.first_name} {user.data.last_name}
                            </Breadcrumb.Item>
                        }
                    </Breadcrumb>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        {userView}
                    </div>
                    <div className="col-xs-6">
                        <UserListLinks users={profiles} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { getUserData } = state;

    return {
        user: getUserData,
        industries: state.industry,
        profiles: state.profile,
        vocation: state.vocation
    };
}

function mapDispatchToProps(dispatch) {
    let y = 1;
    while (y <= profilesPerPage) {
        dispatch(getProfiles({indexId: y, position: y}));
        y++;
    }

    return {
        fetchUserIfNeeded: (requestVars) => {
            dispatch(fetchUserIfNeeded(requestVars));
        },
        getProfiles: (request) => {
            dispatch(getProfiles(request));
        },
        reset:() => {
            dispatch(resetAuth());
        }
    };
}

UserPage.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

UserPage.propTypes = {
    dispatch: React.PropTypes.func,
    fetchUserIfNeeded: React.PropTypes.func,
    getProfiles: React.PropTypes.func,
    user: React.PropTypes.object,
    params: React.PropTypes.object,
    reset: React.PropTypes.func,
    profiles: React.PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage);
