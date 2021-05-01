/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import { database } from "../../firebase";

// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";


class DemoNavbar extends React.Component {
  
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {

    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mlg-5" to="/" tag={Link}>
                <img style={{width: "3rem", height: "3rem", marginRight: "1rem"}}
                  src="/assets/images/Youth-Recruit-Logo.png"
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <div className="navbar-collapse-header">
                      <Link to="/">
                        <img
                          alt="Youth Recruit"
                          src={require("../../assets/img/Youth-Recruit-Logo.png")}
                        />
                      </Link>
                </div>
                  <NavItem>
                      <NavLink
                        className="nav-link-icon"
                        href="/"
                        id=""
                        target="_blank"
                      >
                        <span className="nav-link-inner--text">Youth Recruit</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-link-icon"
                        href="/about-us"
                        id=""
                        target="_blank"
                      >
                        <span className="nav-link-inner--text">About Us</span>
                      </NavLink>
                    </NavItem>
                </Nav>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="/"
                      id=""
                      target="_blank"
                    >
                     <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Find Jobs</span>
                    </NavLink>
                  </NavItem>
                  {/*<NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="#"
                      id=""
                      target="_blank"
                    >
                     <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Post Jobs</span>
                    </NavLink>
                  </NavItem>*/}
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.facebook.com/creativetim"
                      id="tooltip333589074"
                      target="_blank"
                    >
                      <i className="fa fa-facebook-square" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Facebook
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip333589074">
                      Like us on Facebook
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.instagram.com/creativetimofficial"
                      id="tooltip356693867"
                      target="_blank"
                    >
                      <i className="fa fa-instagram" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Instagram
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip356693867">
                      Follow us on Instagram
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://twitter.com/creativetim"
                      id="tooltip184698705"
                      target="_blank"
                    >
                      <i className="fa fa-twitter-square" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Twitter
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip184698705">
                      Follow us on Twitter
                    </UncontrolledTooltip>
                  </NavItem>
                  <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <i className="ni ni-circle-08" />
                      <span className="nav-link-inner--text">Profile</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to={`/profile/${this.props.currentUser.uid}`} tag={Link}>
                        View Profile
                      </DropdownItem>
                      <DropdownItem to={`/profile/${this.props.currentUser.uid}/my-applications`} tag={Link}>
                        My Applicaitons
                      </DropdownItem>
                      <DropdownItem to="/register-page" tag={Link}>
                        Settings
                      </DropdownItem>
                      {/* <DropdownItem to="/login-page" tag={Signout}>
                        Logout
                      </DropdownItem> */}
                      
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  </Nav>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
