const express = require("express");
const router = express.Router();
const Actions = require("../data/helpers/actionModel");

// get all
router.get("/", (req, res) => {
  Actions.get().then(actionzz => {
    res.status(200).json(actionzz);
  });
});




// midware

function validateAction(req, res, next) {
  if (req.body) {
    if (req.body.description) {
      req.body.notes
        ? next()
        : res.status(400).json({ message: "Missing action info" });
    } else {
      res.status(400).json({ message: "Missing action description" });
    }
  } else {
    res.status(400).json({ message: "Missing action data" });
  }
}


function validateActionID(req, res, next) {
  const { id } = req.params;

  Actions.get(id).then(action => {
    if (action) {
      next();
    } else {
      res.status(400).json({ message: "Please provide a valid ID" });
    }
  });
}

module.exports = router;
