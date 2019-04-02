import React, { Component, PropTypes } from "react";
import { logoutUser } from "./../../actions/auth";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, NavItem } from 'react-bootstrap';
import Drawer from 'material-ui/Drawer';
import Auth from './../../reducers/auth';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class SiteNavigation extends Component
{
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleToggle() {
    //console.log('handling toggle');
    this.setState({open: !this.state.open});
  }

  render()
  {
    const { dispatch } = this.props;
    const headerStyle = {
        "backgroundColor": "#D9A920",
    };
    const navItemStyle = {
        "fontFamily": 'Open Sans',
    };

    let auth = Auth(null, {type : 'AUTH_DEFAULT'});
    return (
        <div onClick={this.handleToggle.bind(this)}>
            <Drawer open={this.state.open}>
                <Nav>
                    <LinkContainer to="/"><NavItem eventKey={0} style={navItemStyle}>Home</NavItem></LinkContainer>
                    {/*<LinkContainer to="/profile"><NavItem eventKey={1} style={navItemStyle}>Settings</NavItem></LinkContainer> */}
                    {/*<LinkContainer to="/about"><NavItem eventKey={2} style={navItemStyle}>About (private)</NavItem></LinkContainer> */}
                    {auth.isAuthenticated ? (
                    <NavItem eventKey={3} onClick={() => dispatch(logoutUser())} style={navItemStyle}>Logout</NavItem>
                    ):(
                    <LinkContainer to="/login"><NavItem eventKey={2} style={navItemStyle}>Login</NavItem></LinkContainer>
                    )}
                </Nav>
            </Drawer>
            <AppBar
                title="Creeper"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                style={headerStyle}
            />
        </div>
    );
  }

}

SiteNavigation.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
SiteNavigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};
