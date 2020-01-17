const server = require("./server.js");

const port = 8000;
server.listen(port, () => console.log(`\n API running on ${port} \n`));
