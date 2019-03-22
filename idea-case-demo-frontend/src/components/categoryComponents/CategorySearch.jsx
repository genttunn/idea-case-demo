import React, { Component } from "react";
import { connect } from "react-redux";
import { addCategory } from "../../actions/category";

class CategorySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategoryObject: { id: null, name: null, budget: null }
    };
  }
  inputFieldValueChanged = event => {
    this.setState({
      newCategoryObject: {
        ...this.state.newCategoryObject,
        [event.target.id]: event.target.value
      }
    });
  };
  addCategoryButtonClicked = () => {
    const category = this.state.newCategoryObject;
    this.props.addCategoryLocal(category);

    // this.props.addCategoryLocal(this.state.newCategoryObject);   // Other way
  };
  render = () => {
    return (
      <div>
        <h4>Search Category</h4>
        <br />
        <p>
          Name:{" "}
          <input id="name" type="text" onChange={this.inputFieldValueChanged} />
          <br />
          <br />
          Budget:{" "}
          <input
            id="budget"
            type="text"
            onChange={this.inputFieldValueChanged}
          />
          <br />
          <br />
          <form action="">
            <label>Above</label>
            <input type="radio" id="isAbove" />
            <label>Below</label>
            <input type="radio" id="isBelow" />
          </form>
          <button
            className="btn btn-success "
            type="button"
            onClick={this.addCategoryButtonClicked}
          >
            SEARCH CATEGORY
          </button>
        </p>
      </div>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  addCategoryLocal: category => {
    dispatch(addCategory(category));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(CategorySearch);
