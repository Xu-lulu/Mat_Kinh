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
<<<<<<< HEAD
    variants: [
      {
        color: {
          type: String,
          required: true,
        },
        imageUrl: {
          type: String,
          required: true,
        },
      },
    ],
=======
>>>>>>> 9ddca220376579a1e0bafd0142627836ea037c73
    Image: {
      type: String,
      require: true,
    },
<<<<<<< HEAD
    setFileListImage: {
      type: Array,
    },
    Count: {
=======
    count: {
>>>>>>> 9ddca220376579a1e0bafd0142627836ea037c73
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
