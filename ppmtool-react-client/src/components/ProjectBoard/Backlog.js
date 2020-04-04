import React, { Component, useState } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";
import Draggable from "../../Dnd/Draggable";
import Droppable from "../../Dnd/Droppable";

const droppableStyle = {
  backgroundColor: "#fff",
  width: "100%",
  height: "100%",
  margin: "auto"
};

class Backlog extends Component {
  componentDidUpdate() {
    console.log("updated");
  }

  render() {
    //extracting variable passed to this component
    const { project_tasks_prop } = this.props;

    const tasks = project_tasks_prop.map(project_task => (
      <Draggable id={project_task.projectSequence} style={{ margin: "8px" }}>
        <ProjectTask key={project_task.id} project_task={project_task} />
      </Draggable>
    ));

    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].props.children.props.project_task.status === "TO_DO") {
        tasks[i].props.children.props.project_task["container"] = 1;
        todoItems.push(tasks[i]);
      } else if (
        tasks[i].props.children.props.project_task.status === "IN_PROGRESS"
      ) {
        tasks[i].props.children.props.project_task["container"] = 2;
        inProgressItems.push(tasks[i]);
      } else if (tasks[i].props.children.props.project_task.status === "DONE") {
        tasks[i].props.children.props.project_task["container"] = 3;
        doneItems.push(tasks[i]);
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            <Droppable
              id="dr1"
              value="dr1"
              style={droppableStyle}
              onChange={this.onChange}
            >
              {todoItems}
            </Droppable>

            {
              //draggable content
            }

            {
              //draggable content
            }
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            <Droppable
              id="dr2"
              value="dr2"
              style={droppableStyle}
              onChange={this.onChange}
            >
              {inProgressItems}
            </Droppable>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            <Droppable
              id="dr3"
              value="dr3"
              style={droppableStyle}
              onChange={this.onChange}
            >
              {doneItems}
            </Droppable>
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
