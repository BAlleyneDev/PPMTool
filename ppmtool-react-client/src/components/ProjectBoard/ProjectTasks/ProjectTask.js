import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  deleteProjectTask,
  updateProjectTaskOnBoard
} from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Modal, Button } from "react-bootstrap";

class ProjectTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  onDeleteClick(backlog_id, pt_id) {
    this.props.deleteProjectTask(backlog_id, pt_id);
  }

  onUpdateClick(backlog_id, pt_id, direction) {
    let statusTemp = this.props.project_task.status;
    switch (direction) {
      case "left":
        if (statusTemp === "IN_PROGRESS") {
          statusTemp = "TO_DO";
        } else if (statusTemp === "DONE") {
          statusTemp = "IN_PROGRESS";
        }
        break;

      case "right":
        if (statusTemp === "TO_DO") {
          statusTemp = "IN_PROGRESS";
        } else if (statusTemp === "IN_PROGRESS") {
          statusTemp = "DONE";
        }
        break;

      default:
        statusTemp = this.props.project_task.status;
    }

    const UpdateProjectTask = {
      id: this.props.project_task.id,
      projectSequence: this.props.project_task.projectSequence,
      summary: this.props.project_task.summary,
      acceptanceCriteria: this.props.project_task.acceptanceCriteria,
      status: statusTemp,
      priority: this.props.project_task.priority,
      dueDate: this.props.project_task.dueDate,
      projectIdentifier: this.props.project_task.projectIdentifier,
      created_At: this.props.project_task.created_At
    };

    console.log(UpdateProjectTask);
    this.props.updateProjectTaskOnBoard(
      this.props.project_task.projectIdentifier,
      this.props.project_task.projectSequence,
      UpdateProjectTask
    );
  }

  render() {
    const { project_task } = this.props;
    let priorityString;
    let priorityClass;

    if (project_task.priority === 1) {
      priorityClass = "bg-danger text-light";
      priorityString = "HIGH";
    }

    if (project_task.priority === 2) {
      priorityClass = "bg-warning text-light";
      priorityString = "MEDIUM";
    }

    if (project_task.priority === 3) {
      priorityClass = "bg-info text-light";
      priorityString = "LOW";
    }

    return (
      <div className="card mb-1 bg-light">
        <Modal show={this.state.show}>
          <Modal.Header className="bg-danger">Delete Confirmation</Modal.Header>
          <Modal.Body>
            Are you sure? This will delete this task and all it's contents.
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
              onClick={this.onDeleteClick.bind(
                this,
                project_task.projectIdentifier,
                project_task.projectSequence
              )}
            >
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <div className={`card-header text-primary ${priorityClass}`}>
          <button
            className={classnames("btn", {
              "d-none": project_task.status === "TO_DO"
            })}
            onClick={this.onUpdateClick.bind(
              this,
              project_task.projectIdentifier,
              project_task.projectSequence,
              "left"
            )}
          >
            <i className="fas fa-arrow-left"> </i>
          </button>
          {project_task.projectSequence} Priority: {priorityString}
          <button
            className={classnames("btn", {
              "d-none": project_task.status === "DONE"
            })}
            onClick={this.onUpdateClick.bind(
              this,
              project_task.projectIdentifier,
              project_task.projectSequence,
              "right"
            )}
          >
            <i className="fas fa-arrow-right"> </i>
          </button>
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{project_task.summary}</h5>
          <p className="card-text text-truncate ">
            {project_task.acceptanceCriteria}
          </p>
          <Link
            to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.handleModal.bind(this)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteProjectTask, updateProjectTaskOnBoard }
)(ProjectTask);
