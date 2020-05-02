import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./Project.style.scss";

function Project(props) {
  return (
    <div>
      <Link
        to={{
          pathname: `project/${props.all.project_id}`,
          state: props.all
        }}
      >
        <div className="projects">
          <div className="project-box">
            <div className="project-overlay">
              <p> {props.all.project_name}</p>
            </div>
            <img
              className="project-photo"
              src={props.all.thumbnail}
              alt="project-display"
            />
          </div>
        </div>
      </Link>
      <h6>
        <Link className="project-name" to={`/profile/${props.all.user_id}`}>
          <p className="project-name">
            {`${props.all.first} ${props.all.last}`}
          </p>
        </Link>
      </h6>
    </div>
  );
}
export default withRouter(Project);
