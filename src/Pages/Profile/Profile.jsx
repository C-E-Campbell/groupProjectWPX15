/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Profile.style.scss";
import Project from "../../Components/ProfileProject/ProfileProject";
import axios from "axios";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MainContent from "../../Components/MainContent/MainContent";
import DefaultPic from "./defaultUser.png";

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
      `/auth/get_link_campus_email/${Number(this.props.match.params.id)}`
    );
    if (result.data[0] === true) {
      this.setState({ profileData: result.data[0] });
    } else {
      const result = await axios.get(
        `/auth/get_campus_email/${Number(this.props.match.params.id)}`
      );
      console.log(result.data);
      this.setState({ profileData: result.data[0] });
    }
  }

  render() {
    const mappedProjects = this.props.projectDataMain.map(project => {
      if (project.user_id === Number(this.props.match.params.id)) {
        return <Project profile={project} />;
      }
    });

    return (
      <div className="whole-profile">
        <Sidebar
          showHomeBtn={true}
          loggedUser={this.props.user}
          profileBtn={true}
        />
        <MainContent padding={"0px"}>
          <div className="profile-main">
            <div className="profile-info">
              {/* {this.state.profileData.profile_image ? (
                <img
                  className="profile-info-img"
                  src={`.${this.state.profileData.profile_image}`}
                  alt="profile"
                />
              ) : (
                <img
                  className="profile-info-img"
                  src={DefaultPic}
                  alt="profile"
                />
              )} */}

              <div className="profile-details">
                {this.state.profileData.first}
                {this.state.profileData.last}
              </div>

              {/* <div> */}
              <div className="profilfe-info-text">
                Campus: {this.state.profileData.campus}
              </div>
              <div className="profile-info-text">
                Email: {this.state.profileData.email}
              </div>
              {!this.state.profileData.linkedin ? (
                <></>
              ) : (
                <a target="target_blank" href={this.state.profileData.linkedin}>
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {/* </div> */}
            </div>
            <div className="profile-projects-container">
              <h4>My Projects</h4>
              <div className="profile-grid-container">
                <div className="profile-container">
                  <div className="profile-grid"> {mappedProjects}</div>
                </div>
              </div>
            </div>
          </div>
        </MainContent>
      </div>
    );
  }
}
export default withRouter(Profile);
