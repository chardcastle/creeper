/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetAuth } from './../actions/auth';
import { Panel, FormGroup } from 'react-bootstrap';
import { updateUser, User, fetchUserIfNeeded } from './../actions/userActions';
import { updateVocation, getIndustries } from './../actions/vocationActions';
import MessageError from './common/MessageError';
import MessageSuccess from './common/MessageSuccess';
import OptionItem from './common/OptionItem';

class ProfilePage extends Component
{
    constructor(props) {
        super(props);
        // Set initial state
        this.state = {
            industryValue: 0,
            userIsEditing: false,
            userName: '',
            phoneNumber: '',
            jobTitle: '',
            company: ''
        };

        // Bind `this` to all the methods to ensure it exists
        this.setUserName = this.setUserName.bind(this);
        this.setJobTitle = this.setJobTitle.bind(this);
        this.setCompany = this.setCompany.bind(this);
        this.handleIsEditing = this.handleIsEditing.bind(this);
        this.setPhoneNumber = this.setPhoneNumber.bind(this);
    }

    componentDidMount() {
        this.props.getIndustries();

        // Get user by data stored in browser
        let userDataInBrowser = new User();
        this.props.fetchUserIfNeeded(userDataInBrowser);

    }

    /**
     * The properties of the component have changed
     * Change the state in the form etc...
     * @param newProps
     */
    componentWillReceiveProps(nextProps) {

        console.log('Received new properties');
        const { user } = nextProps;

        // Update the state with new prop values
        if (user.isSuccess) {
            if ('undefined' !== typeof user.data){
                this.getUserName(user);
                if ('undefined' !== typeof user.data.phone_number) {
                    this.getPhoneNumber(user);
                }
                if ('undefined' !== typeof user.data.vocation)
                {
                    this.getJobTitle(user);
                    this.getCompany(user);
                    this.getIndustry(user);
                }
            }
        }

        // Check to see if the user data in the page is stale or expired
        if (user.didInvalidate)
        {
            // Get updated user data
            let userDataInBrowser = new User();
            this.props.fetchUserIfNeeded(userDataInBrowser);
        }
    }


    /**
     * Called when the user submits a name
     * in the change name form
     * @param event
     */
    handleChangeName(event) {
        event.preventDefault();

        // Collect values for the user update
        const nameParts = this.state.userName.split(' ');
        let payload = {
            user_id: this.refs.userId.value,
            // Split the name text into two parts by ' '
            first_name: ('undefined' !== typeof nameParts[0]) ? nameParts[0] : '',
            last_name: ('undefined' !== typeof nameParts[1]) ? nameParts[1] : '',
            phone_number: this.refs.phoneNumber.value
        };

        // Run update user action on server
        this.props.updateUser(payload);
    }

    /**
     * Updates the state.industryValue when an option
     * is choosen from the industry drop down
     * @param event
     */
    handleChangeIndustry(event) {
        this.setState({
            industryValue: event.target.value
        });
    }

    /**
     * Alternates between true and false when the done / edit
     * button is clicked
     */
    handleIsEditing() {
        this.setState({
            userIsEditing: !this.state.userIsEditing
        });
    }

    /**
     * Called when a user submits the vocation change form
     * @param event
     */
    changeVocation(event) {
        // Stop the default / normal page load action
        event.preventDefault();

        // Get data that we want to apply to the user
        let payload = {
            user_id: this.refs.userId.value,
            job_title: this.state.jobTitle,
            company: this.state.company,
            industry_id: this.state.industryValue,
            phone_number: this.state.phoneNumber
        };

        // Run vocation update on the server
        this.props.updateVocation(payload);
    }

    getUserName(user) {
        this.setState({
            userName: user.data.first_name + ' ' + user.data.last_name
        });
    }

    setUserName(event) {
        this.setState({
            userName: event.target.value,
        });
    }

    getPhoneNumber(user) {
        this.setState({
            phoneNumber: user.data.phone_number
        });
    }

    setPhoneNumber(event) {
        this.setState({
            phoneNumber: event.target.value,
        });
    }

    getJobTitle(user) {
        this.setState({
            jobTitle: user.data.vocation.job_title
        });
    }

    setJobTitle(event) {
        this.setState({
            jobTitle: event.target.value
        });
    }

    getCompany(user) {
        this.setState({
            company: user.data.vocation.company
        });
    }

    setCompany(event) {
        this.setState({
            company: event.target.value
        });
    }

    getIndustry(user) {
        this.setState({
            industryValue: user.data.vocation.industry_id
        });
    }

    render() {

        const { user, vocation, industries } = this.props;

        let userId = localStorage.getItem('user_id');

        let response;
        if (vocation.isFetching) {
            response = (<img src="/images/loading.gif" alt="" />);
        } else if (vocation.isFailed || user.isFailed) {
            response = (
                <MessageError title="System Error"
                  message={vocation.systemError}
                  isVisible={true} />
            );
        } else if (vocation.isInvalid || user.isInvalid) {
            response = (
                <MessageError title="Error invalid"
                  errors={vocation.errors}
                  isVisible={true} />
            );
        } else if ((vocation.isSuccess || user.isSuccess) && true === user.didInvalidate) {
            response = (
                <MessageSuccess title="Success"
                    message="Profile updated" isVisible={true} />
            );
        } else if ((vocation.isFailed || user.isFailed) && true === user.didInvalidate) {
            response = (
                <MessageError title="Error"
                                message="Couldn't update profile" isVisible={true} />
            );
        }

        let industryDropDown;

        if (industries.isSuccess) {

            // Create options for drop down menu
            industries.data[0] = '- Select -';
            let industryDropDownOptions = Object.keys(industries.data).map(function(key) {
                return (<OptionItem value={key} text={industries.data[key]} key={key} />);
            });

            // Create industry options drop down
            industryDropDown = (
                <select value={this.state.industryValue}
                    className="form-control mine"
                    // componentClass="select"
                    onChange={(event) => this.handleChangeIndustry(event)}>
                        {industryDropDownOptions}
                </select>
            );
        }

        return (
            <div>
                {this.state.userIsEditing ? (

                    <div>
                        {response}
                        <button className="btn btn-default" onClick={this.handleIsEditing}>Done</button>
                        <Panel>
                            <form onSubmit={(event) => this.handleChangeName(event)} method="post">
                                <FormGroup>
                                    <input type="hidden" ref="userId" className="form-control" value={userId} />
                                    <input type="text" ref="name" value={this.state.userName} onChange={this.setUserName}
                                           placeholder="What is your name" className="form-control" />
                                    <input type="text" ref="phoneNumber" value={this.state.phoneNumber} onChange={this.setPhoneNumber}
                                           placeholder="Phone number" className="form-control" />
                                </FormGroup>
                                <button className="btn btn-primary" type="submit">
                                    Save name
                                </button>
                            </form>
                        </Panel>

                        <Panel>
                            <form onSubmit={(event) => this.changeVocation(event)} method="post">
                                <FormGroup>
                                    <input type="hidden" ref="userId" className="form-control" value={userId} />
                                    <input type="text" ref="jobTitle" value={this.state.jobTitle} onChange={this.setJobTitle}
                                           className="form-control" placeholder="What is your job title?" />
                                    <input type="text" ref="company" value={this.state.company} onChange={this.setCompany}
                                           className="form-control" placeholder="Where do you work" />
                                    {industryDropDown}
                                </FormGroup>
                                <button className="btn btn-primary" type="submit">
                                    Update vocation
                                </button>
                            </form>
                        </Panel>
                    </div>
                ):(
                    <div>
                        <button className="btn btn-default" onClick={this.handleIsEditing}>Edit</button>
                        <h2>{this.state.userName}</h2>
                        <h5>Jobtitle: {this.state.jobTitle}</h5>
                        <h5>Company: {this.state.company}</h5>
                        <h5>Phone number: {this.state.phoneNumber}</h5>
                    </div>
                )}
            </div>

        );
    }

}

function mapStateToProps(state) {
    const { getUserData } = state;

    return {
        user: getUserData,
        industries: state.industry,
        vocation: state.vocation
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateUser:(payload) => {
            dispatch(updateUser(payload));
        },
        updateVocation:(payload) => {
            dispatch(updateVocation(payload));
        },
        getIndustries:() => {
            dispatch(getIndustries());
        },
        reset:() => {
            dispatch(resetAuth());
        },
        fetchUserIfNeeded: (requestVars) => {
            dispatch(fetchUserIfNeeded(requestVars));
        }
    };
}

ProfilePage.propTypes = {
    getIndustries: React.PropTypes.func,
    fetchUsersIfNeeded: React.PropTypes.func,
    dispatch: React.PropTypes.func,
    user: React.PropTypes.object,
    updateUser: React.PropTypes.func,
    updateVocation: React.PropTypes.func,
    vocation: React.PropTypes.string,
    industries: React.PropTypes.object,
    update: React.PropTypes.func,
    reset: React.PropTypes.func,
    fetchUserIfNeeded: React.PropTypes.func,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
