const express = require("express");
const router = express.Router();

const Project = require("../data/helpers/projectModel");

// get all
router.get("/", (req, res) => {
  Project.get(req.params.id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//get by id
router.get("/:id", validateID, (req, res) => {
  const projects = req.projects;
  if (projects) {
    res.status(200).json(projects);
  } else {
    res.status(500).json({ message: "Failed" });
  }
});

//post
router.post("/", validateProject, (req, res) => {
  const project = req.body;

  Project.insert(project)
    .then(projekt => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Failure in adding project" });
    });
});

//put
router.put("/:id", validateID, validateProject, (req, res) => {
  Project.update(req.id, req.body)
    .then(updates => {
      res.status(204).json({ message: " project updated" });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update project" });
    });
});

//midware
function validateID(req, res, next) {
  const { id } = req.params;

  Project.get(id).then(proj => {
    if (proj) {
      req.projects = proj;
      req.id = id;
      next();
    } else {
      res.status(400).json({ message: "Please provide a valid ID" });
    }
  });
}

function validateProject(req, res, next) {
  if (req.body) {
    if (req.body.description) {
      req.body.name
        ? next()
        : res.status(400).json({ message: "Missing required project name" });
    } else {
      res.status(400).json({ message: "Missing required project description" });
    }
  } else {
    res.status(400).json({ message: "Missing project data" });
  }
}

module.exports = router;
