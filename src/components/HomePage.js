/* eslint-disable no-console */
import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserList from './user/UserList';
import { getProfiles } from './../actions/profileActions';
import { getSkillItem } from './../actions/skillActions';
import SkillList from './skill/SkillList';
import { Pagination } from 'react-bootstrap';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const skillsPerPage = 10;
const profilesPerPage = 4;
//let activeProfilesPage = 1;

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.navigateSkillsPagination = this.navigateSkillsPagination.bind(this);
        this.navigateProfilesPagination = this.navigateProfilesPagination.bind(this);

        if ('undefined' !== typeof this.props.params.index) {
            this.activeProfilesPage = this.props.params.index;
        }
        this.navigateProfilesPagination(this.activeProfilesPage);

        this.state = {
            activeSkillsPage: 0,
            activeProfilesPage: this.activeProfilesPage,
            profiles: {},
            skills: {}
        };

    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    componentWillReceiveProps(nextProps)
    {
        const { skills, profiles } = nextProps;

        this.setState({
            skills: skills,
            profiles: profiles
        });
    }

    navigateSkillsPagination(eventKey)
    {
        this.setState({
            activeSkillsPage: eventKey,
            skillItems: {}
        });

        // Request for different skills
        const { skillsPerPage } = this.props;
        let offset = (((eventKey - 1) * skillsPerPage) + 1);
        const max = (offset + skillsPerPage);
        let position = 1;
        while (offset < max) {
            this.props.getSkillItem({indexId: offset, position: position});
            position++;
            offset++;
        }
        return false;
    }

    navigateProfilesPagination(eventKey)
    {
        this.setState({
            activeProfilesPage: eventKey
        });

        browserHistory.push('/users/' + eventKey);

        // Request for different profiles
        let offset = (((eventKey - 1) * profilesPerPage) + 1);
        const max = (offset + profilesPerPage);
        let position = 1;
        while (offset < max) {
            this.props.getProfiles({indexId: offset, position: position});
            console.log('Get ' + offset + ' for position ' + position);
            position++;
            offset++;
        }
        return false;
    }


    render() {

        // @todo Move to css
        // let containerStyle = {
        //   fontFamily: '"Lato", sans-serif',
        //   padding: '30px 0',
        //   borderTop: '1px solid #ddd',
        //   overflow: 'hidden'
        // };

        // @todo Move to css
        let contentHeaderStyle = {
          fontSize: '26px',
          lineHeight: '36px',
          fontWeight: '300',
        };

        return (
            <div className="container-fluid">
                <div>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 style={contentHeaderStyle}>Top Smiths</h3>
                        </div>
                        <div className="col-sm-9">
                            <Pagination
                                className="pull-right"
                                bsSize="large"
                                items={Math.ceil(this.state.profiles.totalItems / profilesPerPage)}
                                activePage={this.state.activeProfilesPage}
                                onSelect={this.navigateProfilesPagination}
                            />
                        </div>
                    </div>

                    <div>
                        {<UserList users={this.state.profiles}/>}
                    </div>
                </div>


                {this.state.skills &&
                    <div>
                        <div className="row" style={contentHeaderStyle}>
                            <div className="col-sm-3">
                                <h3 style={contentHeaderStyle}>Top Skills</h3>
                            </div>
                            <div className="col-sm-3 col-sm-offset-6">
                                <Pagination
                                    className="pull-right"
                                    style={{margin: 0}}
                                    bsSize="large"
                                    activePage={this.state.activeSkillsPage}
                                    items={Math.ceil(this.state.skills.totalItems / skillsPerPage)}
                                    onSelect={this.navigateSkillsPagination}/>
                            </div>
                        </div>
                        <div>
                            {<SkillList skills={this.state.skills}/>}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state/*, ownProps*/) {

  return {
    skillsPerPage: skillsPerPage,
    profilesPerPage: profilesPerPage,
    profiles: state.profile,
    skills: state.skills
  };
}

function mapDispatchToProps(dispatch, ownProps) {

    let x = 1;
    while (x <= skillsPerPage) {
        dispatch(getSkillItem({indexId: x, position: x}));
        x++;
    }

    // console.log('Log for page ' + JSON.stringify(ownProps));
    let page = 1;

    // Use the page number from {{url}}/users/[page-number] (index)
    if ("undefined" !== typeof ownProps.params.index) {
        page = ownProps.params.index;
    }

    console.log("Go to page " + ownProps.params.index);
    while (page <= profilesPerPage) {
        dispatch(getProfiles({indexId: page, position: page}));
        page++;
    }

    return {
        getProfiles: (request) => {
            dispatch(getProfiles(request));
        }
        // getSkillItem: (request) => {
        //     dispatch(getSkillItem(request));
        // }
    };
}

HomePage.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

HomePage.propTypes = {
    skillsPerPage: React.PropTypes.number,
    getProfiles: React.PropTypes.func,
    profiles: React.PropTypes.object,
    skills: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    getSkillItem: React.PropTypes.func,
};

export default connect(
	mapStateToProps,
    mapDispatchToProps
)(HomePage);
