const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const dbFile = path.join(__dirname, "db.json");
const dbData = JSON.parse(fs.readFileSync(dbFile, "utf-8"));

const router = jsonServer.router(dbData);

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
  console.log("JSON Server is running in-memory on http://localhost:3000");
});

module.exports = server;
