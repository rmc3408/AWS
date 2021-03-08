import React from "react";
import { Menu as Nav, Icon } from "element-react";
import { SignOut } from "aws-amplify-react";
import { NavLink } from "react-router-dom";
import { FaEnvira } from "react-icons/fa";

const Navbar = ({ user }) => (
  <Nav mode="horizontal" theme="dark" defaultActive="1">
    <div className="nav-container">
      <Nav.Item index="1">
        <NavLink to="/" className="nav-link">
          <FaEnvira size="2em" color="#f90"/>
          <span className="app-title">VeggyMarket</span>
        </NavLink>
      </Nav.Item>

      <div className="nav-items">
        <Nav.Item index="2">
          <span className="app-user">Hello, {user.username} </span>
        </Nav.Item>
        <Nav.Item index="3">
          <NavLink to="/profile" className="nav-link">
            <Icon name="setting" />
            Profile
          </NavLink>
        </Nav.Item>
        <Nav.Item index="4">
          <SignOut />
        </Nav.Item>
      </div>
    </div>
  </Nav>
);

export default Navbar;
