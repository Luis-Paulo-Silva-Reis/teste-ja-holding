const express = require("express");
const UserControler = require("./controllers/UserController");
const routes = express.Router();

routes.get("/users", UserControler.index);

routes.post("/users", UserControler.store);

routes.post("/login", UserControler.login);

module.exports = routes;
