import React, { Component } from "react";
import { connect } from "react-redux";
class Navbar extends Component {
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
