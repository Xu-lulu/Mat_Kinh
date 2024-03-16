const home = require("./home");
const auth = require("./auth");
const products = require("./products");
const category = require("./category");
const cart = require("./cart");
const { notFound, errHandle } = require("../middleware/errHandle");
const route = (app) => {
  app.use("/", home);
  app.use("/auth", auth);
  app.use("/", products);
  app.use("/", category);
  app.use("/", cart);

  app.use(notFound);
  app.use(errHandle);
};
module.exports = route;
