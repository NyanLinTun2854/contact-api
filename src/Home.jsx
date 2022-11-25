import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <NavLink to="/register">
        <button className="btn btn-primary">Register</button>
      </NavLink>
      <NavLink to="/login">
        <button className="btn btn-success">Login</button>
      </NavLink>
    </div>
  );
};

export default Home;
