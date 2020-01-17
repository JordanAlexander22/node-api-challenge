const express = require("express");
const server = express();
const projectRouter= require("./routes/projectRoute");
//const actionRouter= require("./routes/actionRoute");

server.use(express.json());

server.use('/projects', projectRouter);


server.get("/", (req, res) => {
    res.send(`<h1> testing testing...</h1>`);
  });
  
  
  module.exports = server;