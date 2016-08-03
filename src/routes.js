const path = require('path');
const express = require('express');
const cors = require('cors');
const constants = require(path.resolve('src/util/constants'));
const bodyParser = require('body-parser');
const helmet = require('helmet');
const bearerToken = require('express-bearer-token');

const userController = require(path.resolve('src/controller/user')) ;

/* App Configuration */
const app = express();
app.set('port', constants.server.port);
app.set('title', constants.app.name);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(bearerToken());

app.post('/api/user' , function(req, res) {
  userController.create(req, res);
});

app.post('/api/user/signin' , function(req, res) {
  userController.signin(req, res);
});

app.get('/api/user/:id', function(req, res) {
  userController.get(req, res);
});

/*DEFAULT ROUTE*/
app.get('*' , function(req, res) {
  res.status(404).end();
});

module.exports = app;
