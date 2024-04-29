import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css";
import userContext from "./UserContext";

const NavBar = ({ logOutUser }) => {
  const { user } = useContext(userContext);

  if (!user) {
    return (
      <div>
        <Navbar expand="md" className="NavBar">
          <Nav className="ml-auto" navbar>
            <NavItem className="navbar-brand">
              <NavLink to="/">Jobly</NavLink>
            </NavItem>
            <NavItem className="navbar-link">
              <NavLink to="/signup">Sign Up</NavLink>
            </NavItem>
            <NavItem className="navbar-link">
              <NavLink to="/login">Log In</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }

  return (
    <div>
      <Navbar expand="md">
        <Nav className="ml-auto" navbar>
          <NavItem className="navbar-brand">
            <NavLink to="/">Jobly</NavLink>
          </NavItem>
          <NavItem className="navbar-link">
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
          <NavItem className="navbar-link">
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
          <NavItem className="navbar-link">
            <NavLink to="/profile">Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={logOutUser} to="/" className="navbar-link">
              Log out {user.user["username"]}
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
