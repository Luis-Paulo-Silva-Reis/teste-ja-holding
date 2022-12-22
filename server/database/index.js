const sequelize = require("sequelize");
require("../config/database");
const dbconfig = require("../config/database");

const User = require("../models/User");
const Projects = require("../models/Projects");

const connection = new sequelize(dbconfig);

User.init(connection);
Projects.init(connection);

module.exports = connection;
