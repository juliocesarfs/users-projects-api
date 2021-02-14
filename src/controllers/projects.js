const fs = require('fs');
const data = require('../database/data.json')
const { findProject } = require('../utils');

exports.list = function(req, res) {
  return res.json(data.projects);
}

exports.create = function(req, res) {
  const { name, techs } = req.body;

  const projects = data.projects;

  let id = 1;
  if(projects[0] != null) {
    id = projects[projects.length - 1].id + 1;
  }

  const project = { id, name, techs };

  data.projects.push(project);

  fs.writeFile('src/database/data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(400).json({ error: 'Erro de escrita no arquivo' });
  
    return res.json(project);
  });
}

exports.put = function(req, res) {
  const { id } = req.params;

  const foundProject = findProject(req.params);

  if (!foundProject) return res.status(401).json({ error: 'Projeto nao encontrado. '});

  const project = {
    ...foundProject,
    ...req.body,
    id: Number(foundProject.id)
  }

  const projectIndex = data.projects.findIndex(project => project.id == id);

  data.projects[projectIndex] = project;

  fs.writeFile('src/database/data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(400).json({ error: 'Erro de escrita no arquivo' });
  
    return res.json(project);
  });
}

exports.delete = function(req, res) {
  const { id } = req.params;

  const filteredProjects = data.projects.filter(project => {
    return project.id != id;
  })

  data.projects = filteredProjects;

  fs.writeFile('src/database/data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(400).json({ error: 'Erro de escrita no arquivo' });
  
    return res.status(200).json({ ok: 'Ok'});
  });
}