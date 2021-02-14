const { stringify } = require('querystring');
const data = require('./database/data.json');

module.exports = {
  containsUsername: function(username) {
    for(userDB of data.users) {
      if (userDB.name === username) {
        return true;
      }
    }
    return false;
  },
  authenticator: function(user) {
    for (userDB of data.users) {
      if (userDB.name === user.name && userDB.password == user.password) {
        return userDB;
      }
    }

    return null;
  },
  findProject: function(params) {
    const { id } = params;

    const foundProject = data.projects.find(project => {
      return project.id == id;
    })

    return foundProject;
  }
}