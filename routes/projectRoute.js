const express = require("express");
const router = express.Router();

const Project = require("../data/helpers/projectModel")

// get all
router.get("/", (req, res) => {
    Project
      .get(req.params.id)
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });






  module.exports = router;