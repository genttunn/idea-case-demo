import React, { Component } from "react";
import { connect } from "react-redux";
import { searchCategory } from "../../actions/category";

class CategorySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: { name: null, budget: null, isAbove: 0 }
    };
  }
  inputFieldValueChanged = event => {
    this.setState({
      criteria: {
        ...this.state.criteria,
        [event.target.id]: event.target.value
      }
    });
  };
  onComparisonChanged = event => {
    console.log(event.target.value);
    this.setState({
      criteria: {
        ...this.state.criteria,
        isAbove: Number(event.target.value)
      }
    });
  };
  searchButtonClicked = () => {
    const criteria = this.state.criteria;
    this.props.searchCategoryLocal(criteria);
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
          Budget:{"    "}
          <select id="comparison" onChange={this.onComparisonChanged}>
            <option value="0">Equal</option>
            <option value="1">Above</option>
            <option value="2">Below</option>
          </select>
          <input
            id="budget"
            type="number"
            onChange={this.inputFieldValueChanged}
            style={{ margin: 5 }}
          />
          <br />
          <br />
          <button
            className="btn btn-success "
            type="button"
            onClick={this.searchButtonClicked}
          >
            SEARCH CATEGORY
          </button>
        </p>
      </div>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  searchCategoryLocal: criteria => {
    dispatch(searchCategory(criteria));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(CategorySearch);
