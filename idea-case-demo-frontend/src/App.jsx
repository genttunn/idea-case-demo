import React, { Component } from "react";
import "./App.css";
import Categories from "./views/categoryViews/Categories";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar style={{ marginBottom: 10 }} />
        <main className="container mt-3">
          <Categories />
        </main>
      </React.Fragment>
    );
  }
}

export default App;

/// local view should always get entire state tree from redux store
