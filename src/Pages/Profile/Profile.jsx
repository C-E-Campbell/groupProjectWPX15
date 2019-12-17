import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BasicHeader from "../../Components/BasicHeader/BasicHeader";
import "./Profile.style.scss";
import Project from "../../Components/ProfileProject/ProfileProject";
import axios from "axios";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MainContent from "../../Components/MainContent/MainContent";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: {},
      userInfo: {},
      profileData: {}
    };
  }
  async componentDidMount() {
    const result = await axios.get(
      `/auth/get_link_campus_email/${this.props.user.id}`
    );
    if (result.data[0] === true) {
      this.setState({ profileData: result.data[0] });
    } else {
      const result = await axios.get(
        `/auth/get_campus_email/${this.props.user.id}`
      );
      console.log(result.data);
      this.setState({ profileData: result.data[0] });
    }
  }

  render() {
    const mappedProjects = this.props.projectDataMain.map(project => {
      if (project.user_id === this.props.user.id) {
        return <Project profile={project} />;
      }
    });

    return (
      <div className="whole-profile">
        <Sidebar
        loggedUser={this.props.user.id}
        />
        <MainContent>
        <div className="profile-main">
          

          

          <div className="profile-info">
            <div className="profile-details">
              {this.props.user.first}
              {this.props.user.last}
            </div>

            {/* <div> */}
              <div>Campus: {this.state.profileData.campus}</div>
              <div>Email: {this.state.profileData.email}</div>
              {!this.state.profileData.linkedin ? (
                <></>
              ) : (
                <a target="target_blank" href={this.state.profileData.linkedin}>
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
            {/* </div> */}
          </div>
          <h4>My Projects</h4>
          <div className="profile-grid-container">
          <div className="profile-container">
            <div className="profile-grid"> {mappedProjects}</div>
            </div>
          </div>
        </div>
        </MainContent>
      </div>
    );
  }
}
export default withRouter(Profile);
