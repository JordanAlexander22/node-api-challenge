const express = require("express");
const router = express.Router();
const Actions = require("../data/helpers/actionModel");

// get all
router.get("/", (req, res) => {
  Actions.get().then(actionzz => {
    res.status(200).json(actionzz);
  });
});

//get by id
router.get("/:id", validateActionID, (req, res) => {
  const id = req.params.id;

  Actions.get(id)
    .then(actions => {
      res.status(200).json({ actions });
    })
    .catch(err => {
      res.status(500).json({ err: err });
    });
});

// put
router.put("/:id", validateActionID, validateAction, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Actions.update(id, changes)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(err => {
      res.status(500).json({ message: "put failure :(" });
    });
});

// post
router.post("/", validateAction, (req, res) => {
  Actions.insert(req.body).then(action =>
    res
      .status(200)
      .json({ message: "Action added" })
      .catch(err =>
        res.status(500).json({ message: "Could not add action to database" })
      )
  );
});

// delete
router.delete("/:id", validateActionID, (req, res) => {
  const id = req.params.id;

  Actions.remove(id).then(response => {
    res.status(200).json({
      Deleted: "This action has been deleted"
    });
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
};

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
