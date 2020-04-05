import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";
import { Modal, Button } from "react-bootstrap";

class ProjectItem extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  onDeleteClick = id => {
    this.props.deleteProject(id);
  };

  render() {
    const { project } = this.props;
    if (project.end_date == null) {
      project.end_date = "TBD";
    }

    if (project.start_date == null) {
      project.start_date = "TBD";
    }

    return (
      <div>
        <Modal show={this.state.show}>
          <Modal.Header className="bg-danger">Delete Confirmation</Modal.Header>
          <Modal.Body>
            Are you sure? This will delete the project and all it's contents.
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-outline-primary"
              onClick={this.handleModal.bind(this)}
            >
              No, Cancel
            </Button>
            <Button
              className="btn-outline-danger"
              onClick={this.onDeleteClick.bind(this, project.projectIdentifier)}
            >
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="card  bg-light mb-3">
          <div className="card-header bg-dark text-white">
            <h3>{project.projectName}</h3>
          </div>
          <br />
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">ID: {project.projectIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <li className="list-group-item board">
                <i className="pr-1">{project.description} </i>
              </li>

              <li className="list-group-item update">
                <i className="pr-1">
                  {project.start_date} to {project.end_date}{" "}
                </i>
              </li>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link
                  to={`/projectBoard/${project.projectIdentifier}`}
                  className="pb-2"
                >
                  <li className="list-group-item board btn-outline-primary">
                    <i className="fa fa-flag-checkered pr-1">
                      {" "}
                      View/Add Project Tasks{" "}
                    </i>
                  </li>
                </Link>
                <Link
                  to={`/updateProject/${project.projectIdentifier}`}
                  className="pb-2"
                >
                  <li className="list-group-item update btn-outline-success">
                    <i className="fa fa-edit pr-1"> Update Project Info</i>
                  </li>
                </Link>

                <li
                  /* onClick={this.handleModal.bind(
                    this,
                    project.projectIdentifier
                  )}*/
                  onClick={this.handleModal.bind(this)}
                  className="list-group-item delete btn-outline-danger"
                >
                  <i className="fa fa-minus-circle pr-1 "> Delete Project</i>
                </li>
              </ul>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    deleteProject
  }
)(ProjectItem);
