import React, { Component } from "react";
import CategoryItem from "./CategoryItem";

export default class CategoryListItem extends Component {
  render() {
    return (
      <li>
        <button
          className="btn btn-danger btn-sm p-1"
          onClick={() => this.props.onDel(this.props.item)}
        >
          X
        </button>
        <CategoryItem item={this.props.item} />
      </li>
    );
  }
}
