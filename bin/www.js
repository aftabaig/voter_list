const http = require("http");
const app = require("../app");
const finalHandler = require("finalhandler");
const static = require("node-static");

const port = parseInt(process.env.PORT, 10) || 8002;
app.set('port', port);

var file = new static.Server('./public');

const server = http.createServer(app);
server.listen(port, "0.0.0.0");