import React, { Component } from "react";
import "./App.css";
import SearchCategories from "./views/categoryViews/SearchCategories";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import { toggleSearch } from "./actions/category";
import { connect } from "react-redux";

class Search extends Component {
  componentDidMount(){
    this.props.toggleSearch(true)
  }
  render() {
    return (
      <React.Fragment>
        <Navbar style={{ marginBottom: 10 }} link="/" />
        <main className="container mt-3">
          <SearchCategories />
        </main>
      </React.Fragment>
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
)(Search);


/// local view should always get entire state tree from redux store
