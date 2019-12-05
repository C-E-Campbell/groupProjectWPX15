import React, { Component } from "react";
import "./Projects.style.scss";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Project from "../../Components/Project/Project";
import MainContent from "../../Components/MainContent/MainContent";

class Projects extends Component {
  render() {
    const mappedData = this.props.projectData.map(project => {
      return (
        <Project
          key={project.project_id}
          id={project.project_id}
          title={project.project_name}
          first={project.first}
          last={project.last}
          url={project.url}
        />
      );
    });

    return (
      <div className="project-container">
        <Sidebar />
        <MainContent>
          <div className="project-grid">{mappedData}</div>
        </MainContent>
      </div>
    );
  }
}

export default Projects;
