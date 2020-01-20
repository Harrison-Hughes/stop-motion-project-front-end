import React from "react";
import { NavLink } from "react-router-dom";

const link = {
  width: "100px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "red",
  textDecoration: "none",
  color: "white"
};

const NavBar = () => {
  return (
    <div>
      <NavLink
        to="/"
        /* set exact so it knows to only set activeStyle when route is deeply equal to link */
        exact
        /* add styling to Navlink */
        style={link}
        /* add prop for activeStyle */
        activeStyle={{
          background: "darkred"
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        exact
        style={link}
        activeStyle={{
          background: "darkred"
        }}
      >
        About
      </NavLink>
      <NavLink
        to="/login"
        exact
        style={link}
        activeStyle={{
          background: "darkred"
        }}
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        exact
        style={link}
        activeStyle={{
          background: "darkred"
        }}
      >
        Signup
      </NavLink>
      <NavLink
        to="/messages"
        exact
        style={link}
        activeStyle={{
          background: "darkred"
        }}
      >
        Messages
      </NavLink>
    </div>
  );
};
