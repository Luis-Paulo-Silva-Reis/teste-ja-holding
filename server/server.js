const express = require("express");
const routes = require("./routes");
require("./database");
const app = express();
app.use(express.json());
app.use(routes);
app.listen(3022, () => {
  console.log("Server is running on port 3022");
});
