import React, { Component } from "react";
import "./App.css";
import Categories from "./views/categoryViews/Categories";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Search from "./Search";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Route path="/search" component={Search} />
        </div>

        <Navbar style={{ marginBottom: 10 }} link="/search" />
        <main className="container mt-3">
          <Categories />
        </main>

        <Link to="/search">
          <button className="btn-primary">Search</button>
        </Link>
      </React.Fragment>
    );
  }
}

export default App;

/// local view should always get entire state tree from redux store
