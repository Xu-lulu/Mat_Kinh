const home = require("./home");
const auth = require("./auth");
const products = require("./products");
const category = require("./category");

const route = (app) => {
  app.use("/", home);
  app.use("/auth", auth);
  app.use("/", products);
  app.use("/", category);
};
module.exports = route;
