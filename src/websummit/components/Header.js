import React, { Component } from "react";
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class SiteNavigation extends Component
{
    render(){
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Skillsmith</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav bsStyle="tabs" pullRight>
                    <NavItem eventKey={1}>Profile</NavItem>
                    <NavItem eventKey={2}>Logout</NavItem>
                </Nav>
            </Navbar>
        );
    }

}

export default SiteNavigation;
