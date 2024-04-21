const mongoose = require("mongoose");

const Products = new mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
    },
    Price: {
      type: String,
      require: true,
    },
    Description: {
      type: String,
      require: true,
    },
    Image: {
      type: String,
      require: true,
    },
    count: {
      type: String,
      require: true,
    },
    Category: {
      type: String,
      require: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deleteAt: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Products", Products);
