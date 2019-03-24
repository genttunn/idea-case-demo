import React, { Component } from "react";
import "./App.css";
import SearchCategories from "./views/categoryViews/SearchCategories";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";

class Search extends Component {
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

export default Search;

/// local view should always get entire state tree from redux store
