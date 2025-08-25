const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const dbFile = path.join(__dirname, "db.json");
const router = jsonServer.router(dbFile);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/blog/:resource/:id/show": "/:resource/:id",
  })
);

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});

module.exports = server;
