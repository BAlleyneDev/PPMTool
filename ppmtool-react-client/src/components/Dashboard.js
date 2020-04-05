import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";
import projectHeader from "../undraw_mobile_wireframe_euf4.svg";

class Dashboard extends Component {
  //how component wil load
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    //const projects = this.props.project.projects;
    const { projects } = this.props.project;

    return (
      <div className="projects">
        <div className="container card">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-3 text-center">Projects</h1>
              <img
                src={projectHeader}
                width="10%"
                height="10%"
                alt="background"
              />
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              {projects.map(project => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
};

//index.js project
const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Dashboard);
