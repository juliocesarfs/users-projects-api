require('dotenv-safe').config();

const fs = require('fs');
const data = require('../database/data.json')
const { containsUsername, authenticator } = require('../utils');

const jwt = require('jsonwebtoken');

exports.verifyJWT = function(req, res, next) {
  const authHaeader = req.headers.authorization;
  const token = authHaeader;

  if (token === null) return res.status(401);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(403).json({ auth: false, message: 'Falha de autenticação' });
    
    req.user = user;
    
    next();
  })
}

exports.login = function(req, res) {
  const { name, password } = req.body;
  const user = authenticator({ name, password });

  if (user === null) {
    return res.status(500).json({ error: 'usuario ou senha incorretos' });
  }

  const token = jwt.sign(user, process.env.SECRET, {
    expiresIn: 600
  });

  req.headers.authorization = token;

  res.json({ token: token });
}

exports.list = function(req, res) {
  return res.json(data.users);
}

exports.create = function(req, res) {
  const { name, password } = req.body;

  const contains = containsUsername(name);

  if (contains) {
    return res.json({ error: 'Nome de usuário indisponivel' });
  }

  const users = data.users;

  let id = 1;
  if(users[0] != null) {
    id = users[users.length - 1].id + 1;
  }

  const user = { id, name, password };

  data.users.push(user);

  fs.writeFile('src/database/data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(400).json({ error: 'Erro de escrita no arquivo' });
  
    return res.json(user);
  });
}

