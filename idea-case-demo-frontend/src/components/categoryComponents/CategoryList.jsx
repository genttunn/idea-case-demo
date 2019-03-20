import React, { Component } from "react";
//import { fetchTestCategories as oldOne } from '../../models/Test';
import {
  fetchAllCategories,
  editCategory,
  deleteCategory
} from "../../actions/category";
import CategoryListItem from "./CategoryListItem";
import { connect } from "react-redux";
import CategoryEdit from "./CategoryEdit";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      modalId: "0",
      modalName: "",
      modalBudget: 0
    };
  }
  handleClose = () => {
    this.setState({ modalShow: false });
  };

  handleShow = (id, name, budget) => {
    this.setState(
      { modalId: id, modalName: name, modalBudget: budget },
      function() {
        this.setState({ modalShow: true });
      }
    );
  };

  componentDidMount() {
    //this.setState({ categories: fetchTestCategories() });
    this.props.categoriesFetchAll();
  }''

  render() {
    return (
      <div>
        <h4>List of Categories</h4>
        <ol>
          {this.props.categories.categoryList.map(item => (
            <li key={item.id}>
              <CategoryListItem
                key={item.id}
                item={item}
                onDel={this.props.categoryDel}
              />
              {"  "}
              <a
                onClick={() => this.handleShow(item.id, item.name, item.budget)}
                style={{ color: "blue" }}
              >
                Edit
              </a>
              <br />
              <br />
            </li>
          ))}
        </ol>
        <CategoryEdit
          show={this.state.modalShow}
          handleClose={this.handleClose}
          modalId={this.state.modalId}
          modalName={this.state.modalName}
          modalBudget={this.state.modalBudget}
          onEdit={this.props.categoryEdit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  categoriesFetchAll: () => {
    dispatch(fetchAllCategories());
  },
  categoryDel: category => {
    dispatch(deleteCategory(category));
  },
  categoryEdit: category => {
    dispatch(editCategory(category));
  }
});

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);
