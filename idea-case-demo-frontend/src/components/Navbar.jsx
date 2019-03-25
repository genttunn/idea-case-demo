import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../App";
import Search from "../Search";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

class Navbar extends Component {
  renderName = () => {
    return this.props.link === "/" ? "Home" : "Search";
  };
  render() {
    const categoryList = this.props.categories.categoryList;
    let budget = 0;
    for (let i = 0; i < categoryList.length; i++) {
      budget += categoryList[i].budget;
    }
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a href="_blank" className="navbar-brand" style={{ color: "white" }}>
          Category List

          <Link to={this.props.link}>
            <button type="button"
              className=" btn btn-primary m-3 p-1"
            >
              {this.renderName()}
            </button>
          </Link>
        </a>
        <span style={{ color: "white" }}>
         
          Total budget : <span className="badge badge-primary">€{budget}</span>
        </span>
      </nav>
    );
  }
}



const mapStateToProps = state => ({
  categories: state.categories
});
export default connect(
  mapStateToProps,
  null
)(Navbar);
