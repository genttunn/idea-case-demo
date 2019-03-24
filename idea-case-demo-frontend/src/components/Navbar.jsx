import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../App";
import Search from "../Search";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { toggleSearch } from "../actions/category";
class Navbar extends Component {
  renderButton = () => {
    return this.props.link === "/" ? "Home" : "Search";
  };
  toggleSearchMode = () => {
    if (this.props.link === "/") {
      this.props.toggleSearch(false);
    } else {
      this.props.toggleSearch(true);
    }
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
        </a>
        <span style={{ color: "white" }}>
          <Link to={this.props.link}>
            <button
              className="btn-primary m-3"
              onClick={() => this.toggleSearchMode()}
            >
              {this.renderButton()}
            </button>
          </Link>
          Total budget : <span className="badge badge-primary">€{budget}</span>
        </span>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleSearch: isSearch => {
    dispatch(toggleSearch(isSearch));
  }
});

const mapStateToProps = state => ({
  categories: state.categories
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
