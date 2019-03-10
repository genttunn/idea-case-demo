import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
class CategoryEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategoryObject: { id: this.props.modalId, name: null, budget: null }
    };
  }
  inputFieldValueChanged = event => {
    let fooCat = {
      ...this.state.newCategoryObject,
      [event.target.id]: event.target.value
    };
    fooCat.id = this.props.modalId;
    this.setState({
      newCategoryObject: fooCat
    });
  };
  render() {
    return (
      <React.Fragment>
        <Modal size="lg" show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>
              Name:{" "}
              <input
                id="name"
                type="text"
                placeholder={this.props.modalName}
                onChange={this.inputFieldValueChanged}
              />
              {"  "}
              Budget:{" "}
              <input
                id="budget"
                type="number"
                placeholder={this.props.modalBudget}
                onChange={this.inputFieldValueChanged}
              />
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => this.props.onEdit(this.state.newCategoryObject)}
              onMouseUp={this.props.handleClose}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CategoryEdit;
