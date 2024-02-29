const mongoose = require("mongoose");

const Catego = new mongoose.Schema(
  {
    Namecategory: {
      type: String,
      require: true,
    },
    deleteAt: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Catego", Catego);
