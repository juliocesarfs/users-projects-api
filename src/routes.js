const express = require('express');
const routes = express.Router();
const users = require('./controllers/users');
const projects = require('./controllers/projects');

routes.post('/login', users.login);

routes.get('/users', users.verifyJWT, users.list);

routes.post('/users', users.create);


// projects routes
routes.get('/projects', users.verifyJWT, projects.list)

routes.post('/projects', users.verifyJWT, projects.create);

routes.delete('/projects/:id', users.verifyJWT, projects.delete);

routes.put('/projects/:id', users.verifyJWT, projects.put);

module.exports = routes;