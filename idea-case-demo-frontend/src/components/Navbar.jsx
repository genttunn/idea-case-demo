import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" style={{ color: "white" }}>
          Category List
        </a>
      </nav>
    );
  }
}

export default Navbar;
