import React, { Component } from "react";
import "./SingleProject.style.scss";
import CommentSidebar from "../../Components/CommentSidebar/CommentSidebar";
import MainContent from "../../Components/MainContent/MainContent";
import { withRouter } from "react-router-dom";

class SingleProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      up: false
    };
  }

  toDown() {
    this.setState({
      up: true
    });
  }
  toUp() {
    this.setState({
      up: false
    });
  }
  render() {
    return (
      <div className="single-project-container">
        <CommentSidebar
          ids={this.props.allUsers}
          user={this.props.user.id}
          project={Number(this.props.match.params.id)}
        />
        <MainContent className="whole">
          <div className="single-container">
            <div id="top" className={this.state.up ? "hide" : "show"}>
              <iframe
                style={{ height: "77vh", width: "90%" }}
                className="iframe"
                title="project"
                src={this.props.location.state.host_url}
              ></iframe>

              <div className="btn-to-info">
                <button onClick={e => this.toDown(e.target.value)}>
                  Project Details <i className="fas fa-chevron-down"></i>
                </button>
              </div>
            </div>
            <div
              id="bottom"
              className={this.state.up ? "single-project-details" : "view"}
            >
              <header>
                <div className="header-inner-container">
                  <h2>
                    {" "}
                    {this.props.location.state.first}{" "}
                    {this.props.location.state.last}
                  </h2>
                  <i className="fab fa-github-alt fa-3x github"></i>
                  {/* <h2>{this.props.location.state.project_name}</h2> */}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.props.location.state.github}
                  >
                    {/* <i className="fab fa-github-alt fa-3x"></i> */}
                  </a>
                </div>
              </header>
              <img
                className="project-details-photo"
                src={this.props.location.state.thumbnail}
                alt="user"
              />
              <h2 className="proname">
                {this.props.location.state.project_name}
              </h2>
              <div className="project-contact-container">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={this.props.location.state.linkedin}
                >
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>

                <a href={"mailto:" + this.props.location.state.email}>
                  <i className="far fa-envelope fa-2x"></i>
                </a>
              </div>
              <div className="single-project-description">
                <h2 className="descript">Description:</h2>
                <div className="acdescript">
                  <p>{this.props.location.state.description}</p>
                </div>

                {/* <div className="single-project-tech">
                  <h2>Technologies</h2>
                  <ul>{this.props.location.state.technologies.join(" ")}</ul>
                </div> */}
              </div>
            </div>
            <div
              className={this.state.up ? "btn-to-info btn-to-info2" : "view"}
            >
              <button onClick={e => this.toUp(e.target.value)}>
                Live Project <i className="fas fa-chevron-up"></i>
              </button>
            </div>
          </div>
        </MainContent>
      </div>
    );
  }
}
export default withRouter(SingleProjects);
