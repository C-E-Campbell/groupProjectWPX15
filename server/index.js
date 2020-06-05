require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');

const profileCTRL = require('./profile_controller');
const fileUpload = require('express-fileupload');

app.use(express.static(`${__dirname}/../build`));

app.use(fileUpload());
app.use(express.json());

const {
  register,
  logout,
  login,
  getNames,
  getCampusAndEmail,
} = require('./auth_controller');

const {
  userProjects,
  deleteProject,
  editproject,
  getAllProjects,
  addProject,
  addFeedback,
  editFeedback,
  deleteFeedback,
  getAllFeedback,
} = require('./projects_controller');

const {
  getAllIdeas,
  addIdea,
  editIdea,
  deleteIdea,
  addIdeaFeedback,
  editIdeaFeedback,
  deleteIdeaFeedback,
  getIdeaFeedback,
} = require('./idea_controller');

const { getCampusInfo, getCampusLinkEamil } = require('./chart_controller');

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;
app.use(
  session({
    secret: 'dkfjeosirjtsekfgmlksdfjgpoiwrejthgradfso',
    resave: false,
    saveUninitialized: false,
    cookies: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
  })
);
const string =
  'postgres://gmxzovjfjktxng:97a3ee3e95fe129285ea95c470854c3ac5a762df20cce6c8de478af6969f3a78@ec2-50-19-95-77.compute-1.amazonaws.com:5432/dft043im6lq5dn?ssl=true';
massive(string)
  .then((db) => {
    console.log('database connected');
    app.set('db', db);
  })
  .catch((err) => {
    console.log('from massive', err);
  });

app.post('/auth/register', register);
app.post('/auth/login', login);

app.post('/auth/imageupload/:id', profileCTRL.imgUpload);
app.delete('/auth/logout', logout);
app.get('/auth/getAllProjects', getAllProjects);
app.get('/auth/getProfilePhoto/:id', profileCTRL.getProfilePhoto);
app.get('/auth/userProjects/:user_id', userProjects);
app.get('/auth/getNames', getNames);
app.delete('/auth/delete_project/:project_id', deleteProject);
app.put('/auth/edit_project', editproject);
app.post('/auth/addProject', addProject);

app.get('/auth/get_all_feedback/:id', getAllFeedback);
app.post('/auth/add_feedback', addFeedback);
app.put('/auth/edit_feedback', editFeedback);
app.delete('/auth/delete_feedback/:feedback_id/:project_id', deleteFeedback);

app.get('/auth/get_ideas', getAllIdeas);
app.post('/auth/add_idea', addIdea);
app.put('/auth/edit_idea', editIdea);
app.delete('/auth/delete_idea/:idea_id', deleteIdea);

app.get('/auth/get_idea_feedback', getIdeaFeedback);
app.post('/auth/add_idea_feedback', addIdeaFeedback);
app.put('/auth/edit_idea_feedback', editIdeaFeedback);
app.delete('/auth/delete_idea_feedback/:idea_feedback_id', deleteIdeaFeedback);

app.get('/auth/get_campus', getCampusInfo);
app.get('/auth/get_campus_email/:id', getCampusAndEmail);
app.get('/auth/get_link_campus_email/:id', getCampusLinkEamil);

let port = SERVER_PORT || 4001;
const expressServer = app.listen(port, () =>
  console.log(`up and running on port ${port}`)
);

const path = require('path');

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
