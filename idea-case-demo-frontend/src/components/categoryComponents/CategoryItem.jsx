import React, { Component } from "react";

export default class CategoryItem extends Component {
  render() {
    return (
      <span>
        {` Category: ${this.props.item.name}, Budget:  €${
          this.props.item.budget
        } (ID: ${this.props.item.id})`}
      </span>
    );
  }
}
