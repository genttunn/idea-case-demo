import React, { Component } from "react";
import CategoryAdd from "../../components/categoryComponents/CategoryAdd";
import CategoryList from "../../components/categoryComponents/CategoryList";
import CategoryRandomized from "../../components/categoryComponents/CategoryRandomized";

export default class Categories extends Component {
  render() {
    return (
      <div>
        <CategoryAdd />
        <hr />
        <CategoryList />
        <CategoryRandomized />
        <br />
        <br />
      </div>
    );
  }
}
