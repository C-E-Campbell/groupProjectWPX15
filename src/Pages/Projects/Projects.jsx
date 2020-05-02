import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Projects.style.scss";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Project from "../../Components/Project/Project";
import MainContent from "../../Components/MainContent/MainContent";
import axios from "axios";
class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      noData: false,
      projectData: [],
      profileImg: null
    };
    this.getSearch.bind(this);
  }
  async componentDidMount() {
    this.resetData();
    if (this.state.profileImg === null) {
      this.getProfilePhoto();
    }
  }
  getSearch = data => {
    this.setState({ search: data });
  };

  getProfilePhoto = async () => {
    const results = await axios.get(
      `/auth/getProfilePhoto/${this.props.userData.id}`
    );
    this.setState({
      profileImg: results.data
    });
  };

  resetData = async () => {
    if (!this.state.projectData[0]) {
      const results = await axios.get("/auth/getAllProjects");
      this.setState({
        projectData: results.data
      });
    }
  };

  render() {
    let filterTech;
    if (this.state.projectData[0]) {
      filterTech = this.state.projectData
        .map(content => {
          let arr = [];
          for (let key in content) {
            if (content[key] === true) {
              arr.push(key);
            }
          }
          content.technologies = arr;

          return content;
        })

        .filter(items => {
          return (
            items.first
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            items.last
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1 ||
            items.project_name
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1
            // items.technologies[0].indexOf(this.state.search) !== -1 ||
            // items.technologies[1].indexOf(this.state.search) !== -1 ||
            // items.technologies[2].indexOf(this.state.search) !== -1 ||
            // items.technologies[3].indexOf(this.state.search) !== -1 ||
            // items.technologies[4].indexOf(this.state.search) !== -1
          );
        })

        .map(project => {
          return <Project key={project.project_id} all={project} />;
        });
    } else {
      this.resetData();
    }

    return (
      <div className="project-container">
        <Sidebar
          picture={this.state.profileImg}
          found={this.getSearch}
          loggedUser={this.props.userData}
          getPhoto={this.getProfilePhoto}
        />
        <MainContent>
          {this.state.noData ? (
            <h1>Hello</h1>
          ) : (
            <div className="project-grid">{filterTech}</div>
          )}
        </MainContent>
      </div>
    );
  }
}

export default withRouter(Projects);
