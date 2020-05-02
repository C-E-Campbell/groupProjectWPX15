import React from "react";
import "./Landing.style.scss";
import logo from "../../Assets/DevMtnLogo.png";
import video from "../../Assets/landing-video.mp4";
import { withRouter } from "react-router-dom";
import spinner from "../../Assets/spinner.svg";
import axios from "axios";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formFlag: false,
      first: "",
      last: "",
      email: "",
      password: "",
      campus: null,
      status: null,
      allIds: []
    };
  }

  getProjects = async () => {
    const results = await axios.get("/auth/getAllProjects");
    this.setState({
      formFlag: false,
      first: "",
      last: "",
      email: "",
      password: "",
      campus: null,
      status: null,
      projectData: results.data
    });
    this.props.projects(results.data);
  };

  checkcache = () => {
    if (localStorage.getItem("localCachedEmail")) {
      const lsEmail = localStorage.getItem("localCachedEmail");
      axios
        .post("/auth/checkcache", {
          email: lsEmail
        })
        .then(res => {
          if (res.data) {
            this.setState({
              email: localStorage.getItem("localCachedEmail"),
              password: res.data
            });
            this.login();
          }
        });
    }
  };

  componentDidMount = async () => {
    this.getProjects();
    this.checkcache();
  };

  register = async e => {
    e.preventDefault();
    const { first, last, email, password, campus, status } = this.state;
    localStorage.setItem("localCachedEmail", email);
    const result = await axios.post("/auth/register", {
      first,
      last,
      email,
      password,
      campus,
      status
    });
    this.props.user(result.data);
    this.props.history.push("/projects");
  };

  login = async () => {
    if (this.state.email === "" || this.state.password === "") {
    } else {
      const { email, password } = this.state;

      const result = await axios.post("/auth/login", {
        email,
        password
      });

      if (result.data.email) {
        localStorage.setItem("localCachedEmail", email);
      }

      this.props.user(result.data);
      this.props.history.push("/projects");
    }
  };

  render() {
    return (
      <div>
        {window.localStorage.getItem("localCachedEmail") ? (
          <div className="landing-container">
            <div
              className="landing-sidebar"
              data-aos="slide-right"
              data-aos-easing="ease-in"
              data-aos-duration="300"
            >
              <div className="landing-logo">
                <img src={logo} alt="devmtn" />
              </div>

              <div className="landing-contact-box" data-aos="fade">
                <h3>Basecamp to Summit. Showcase your climb.</h3>
              </div>
              <h1>Checking For Users</h1>
              <img src={spinner} alt="spinner" />
            </div>
            <div
              className="landing-main"
              data-aos="fade"
              data-aos-duration="2000"
            >
              <div className="landing-main-cta">
                <h1>
                  This Is <br /> DevMountain
                </h1>
                <p>
                  A Project Showcase For All Dev Mountain Students. <br /> Past
                  and Present.
                </p>
              </div>

              <div className="landing-main-overlay"></div>
              <video className={"video"} autoPlay loop muted>
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </div>
        ) : (
          <div>
            {this.state.formFlag ? (
              <div className="landing-container">
                <div
                  className="landing-sidebar"
                  data-aos="slide-right"
                  data-aos-easing="ease-in"
                  data-aos-duration="300"
                >
                  <div className="landing-logo">
                    <img src={logo} alt="devmtn" />
                  </div>

                  <div className="landing-contact-box" data-aos="fade">
                    <h3>Basecamp to Summit. Showcase your climb.</h3>

                    <form className="landing-form">
                      <input
                        placeholder="First Name"
                        onChange={e => {
                          this.setState({ first: e.target.value });
                        }}
                      />
                      <input
                        placeholder="Last Name"
                        onChange={e => this.setState({ last: e.target.value })}
                      />
                      <input
                        placeholder="Email"
                        type="email"
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                      <input
                        placeholder="Password"
                        type="password"
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
                      />
                      <select
                        defaultValue="none"
                        onChange={e =>
                          this.setState({ campus: e.target.value })
                        }
                        name="campus"
                        id="campus"
                      >
                        <option disabled value="none">
                          Choose your campus
                        </option>
                        <option value="Lehi">Lehi</option>
                        <option value="Dallas">Dallas</option>
                        <option value="Phoenix">Phoenix</option>
                      </select>
                      <select
                        defaultValue="none"
                        onChange={e =>
                          this.setState({ status: e.target.value })
                        }
                        name="statuss"
                        id="status"
                      >
                        <option disabled value="none">
                          Choose Student, Mentor, Instructor
                        </option>
                        <option value="Student">Student</option>
                        <option value="Mentor">Mentor</option>
                        <option value="Instructor">Instructor</option>
                      </select>
                      <button onClick={e => this.register(e)}>Register</button>
                    </form>
                    <h6
                      onClick={() => {
                        this.setState({ formFlag: false });
                      }}
                    >
                      Already have account?
                    </h6>
                  </div>
                </div>
                <div
                  className="landing-main"
                  data-aos="fade"
                  data-aos-duration="2000"
                >
                  <div className="landing-main-cta">
                    <h1>
                      This Is <br /> DevMountain
                    </h1>
                    <p>
                      A Project Showcase For All Dev Mountain Students. <br />{" "}
                      Past and Present.
                    </p>
                  </div>

                  <div className="landing-main-overlay"></div>
                  <video className={"video"} autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                  </video>
                </div>
              </div>
            ) : (
              <div className="landing-container">
                <div
                  className="landing-sidebar"
                  data-aos="slide-right"
                  data-aos-easing="ease-in"
                  data-aos-duration="300"
                >
                  <div className="landing-logo">
                    <img src={logo} alt="devmtn" />
                  </div>
                  <div
                    className="landing-contact-box"
                    data-aos="fade"
                    data-aos-duration="2000"
                  >
                    <h3
                      data-aos="fade"
                      data-aos-duration="2000"
                      data-aos-delay="400"
                    >
                      Basecamp to Summit. <br /> Showcase your climb.
                    </h3>

                    <form className="landing-form">
                      <input
                        placeholder="Email"
                        type="email"
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
                      />
                      <button
                        onClick={e => {
                          e.preventDefault();
                          this.login();
                        }}
                      >
                        Login
                      </button>
                    </form>
                    <h6
                      onClick={() => {
                        this.setState({ formFlag: true });
                      }}
                    >
                      Register Here
                    </h6>
                  </div>
                </div>
                <div
                  className="landing-main"
                  data-aos="fade"
                  data-aos-duration="2000"
                >
                  <div className="landing-main-cta">
                    <h1>
                      This Is <br /> DevMountain
                    </h1>
                    <p>
                      A Project Showcase For All DevMountain Students. <br />{" "}
                      Past and Present.
                    </p>
                  </div>

                  <div className="landing-main-overlay"></div>
                  <video className={"video"} autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                  </video>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Landing);
