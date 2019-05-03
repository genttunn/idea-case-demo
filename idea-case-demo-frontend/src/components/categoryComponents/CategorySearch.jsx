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
  searchButtonClicked = event => {
    event.preventDefault();
    let criteria = this.state.criteria;
    if (this.state.criteria.name === null || !this.state.criteria.name.trim()) {
      this.props.searchCategoryLocal(criteria);
    } // if name epmty switch to string search
    else {
      criteria.isAbove = 3;
      this.props.searchCategoryLocal(criteria);
    }
    this.setState(
      {
        criteria: { name: null, budget: null, isAbove: 0 }
      },
      () => this.refs.form.reset()
    );
  };

  render = () => {
    return (
      <div>
        <h4>Search Category</h4>
        <br />
        <form ref="form">
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
          <input
            className="btn btn-success "
            type="submit"
            onClick={this.searchButtonClicked}
            value="SEARCH CATEGORY"
          />
        </form>
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
