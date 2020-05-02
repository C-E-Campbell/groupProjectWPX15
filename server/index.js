require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
// const socketio = require("socket.io");
const profileCTRL = require("./profile_controller");
const fileUpload = require("express-fileupload");

app.use(express.static(`${__dirname}/../build`));

app.use(fileUpload());
app.use(express.json());

const {
  register,
  logout,
  login,
  checkCache,
  getNames,
  getCampusAndEmail
} = require("./auth_controller");

const {
  userProjects,
  deleteProject,
  editproject,
  getAllProjects,
  addProject,
  addFeedback,
  editFeedback,
  deleteFeedback,
  getAllFeedback
} = require("./projects_controller");

const {
  getAllIdeas,
  addIdea,
  editIdea,
  deleteIdea,
  addIdeaFeedback,
  editIdeaFeedback,
  deleteIdeaFeedback,
  getIdeaFeedback
} = require("./idea_controller");

const { getCampusInfo, getCampusLinkEamil } = require("./chart_controller");

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookies: {
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  console.log("database connected");
  app.set("db", db);
});

app.post("/auth/register", register);
app.post("/auth/login", login);
app.post("/auth/checkcache", checkCache);
app.post("/auth/imageupload/:id", profileCTRL.imgUpload);
app.delete("/auth/logout", logout);
app.get("/auth/getAllProjects", getAllProjects);
app.get("/auth/getProfilePhoto/:id", profileCTRL.getProfilePhoto);
app.get("/auth/userProjects/:user_id", userProjects);
app.get("/auth/getNames", getNames);
app.delete("/auth/delete_project/:project_id", deleteProject);
app.put("/auth/edit_project", editproject);
app.post("/auth/addProject", addProject);

app.get("/auth/get_all_feedback/:id", getAllFeedback);
app.post("/auth/add_feedback", addFeedback);
app.put("/auth/edit_feedback", editFeedback);
app.delete("/auth/delete_feedback/:feedback_id/:project_id", deleteFeedback);

app.get("/auth/get_ideas", getAllIdeas);
app.post("/auth/add_idea", addIdea);
app.put("/auth/edit_idea", editIdea);
app.delete("/auth/delete_idea/:idea_id", deleteIdea);

app.get("/auth/get_idea_feedback", getIdeaFeedback);
app.post("/auth/add_idea_feedback", addIdeaFeedback);
app.put("/auth/edit_idea_feedback", editIdeaFeedback);
app.delete("/auth/delete_idea_feedback/:idea_feedback_id", deleteIdeaFeedback);

app.get("/auth/get_campus", getCampusInfo);
app.get("/auth/get_campus_email/:id", getCampusAndEmail);
app.get("/auth/get_link_campus_email/:id", getCampusLinkEamil);

let port = SERVER_PORT || 4001;
const expressServer = app.listen(port, () =>
  console.log(`up and running on port ${port}`)
);

// const io = socketio(expressServer);

// io.on("connection", socket => {
//   socket.on("message", message => {
//     io.emit("newMessage", message);
//   });
// });

const path = require("path");

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
