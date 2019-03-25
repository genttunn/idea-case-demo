import React, { Component } from "react";
import "./App.css";
import Categories from "./views/categoryViews/Categories";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import { toggleSearch } from "./actions/category";
import { connect } from "react-redux";


class App extends Component {
  componentDidMount(){
    this.props.toggleSearch(false)
  }
  render() {
    return (
      <React.Fragment>
        <Navbar style={{ marginBottom: 10 }} link="/search" />
        <main className="container mt-3">
          <Categories />
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
)(App);


/// local view should always get entire state tree from redux store
