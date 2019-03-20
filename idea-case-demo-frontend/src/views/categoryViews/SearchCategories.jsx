import React, { Component } from "react";
import CategoryList from "../../components/categoryComponents/CategoryList";
import CategorySearch from "../../components/categoryComponents/CategorySearch";
export default class SearchCategories extends Component {
  render() {
    return (
      <div>
        <CategorySearch />
        <hr />
        <CategoryList />
      </div>
    );
  }
}
