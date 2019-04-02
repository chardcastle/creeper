/* eslint-disable no-console */
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { callSmith } from '../../actions/callActions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { config } from '../../config';
import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';
import ListItem from '../common/ListItem';

// Since this component is simple and static, there's no parent container for it.
class UserView extends Component
{
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    placeCall(event, user)
    {
        console.log('Calling');
        event.preventDefault();
        callSmith(user);
    }

    render()
    {
        const { user } = this.props;

        if ('undefined' === typeof user.data.skills) {
            return null;
        }

        return (
            <div className="container-fluid">
                <div className="row user-image">
                    <div className="col-sm-12">
                        <img src={config.baseUrl + '/user/' + user.data.reference  + '/picture'}/>
                    </div>
                </div>
                <div className="row user-text">
                    <div className="col-sm-12">
                        {user.data.first_name &&
                            <h2>{user.data.first_name} {user.data.last_name}</h2>
                        }

                        {user.data.vocation.job_title &&
                            <p>
                                <strong>Job Title:</strong> {user.data.vocation.job_title}
                            </p>
                        }

                        {user.data.vocation.company &&
                        <p><strong>Company:</strong> {user.data.vocation.company}</p>
                        }

                        {user.data.skills.length > 0 &&
                            <div>
                                <p><strong>Skills:</strong></p>
                                <ul>{user.data.skills.map(function(skill, i) {
                                    return (skill.skill && <ListItem key={i} text={skill.skill.title} />);
                                })}</ul>
                            </div>
                        }

                        {user.data &&
                            <RaisedButton label="Call this smith"
                                onClick={(e) => this.placeCall(e, user.data.reference)}
                                primary={true}
                                fullWidth={true} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

UserView.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

UserView.propTypes = {
    dispatch: React.PropTypes.func,
    fetchUserIfNeeded: React.PropTypes.func,
    getProfiles: React.PropTypes.func,
    user: React.PropTypes.object,
    params: React.PropTypes.object,
    reset: React.PropTypes.func
};

export default UserView;
