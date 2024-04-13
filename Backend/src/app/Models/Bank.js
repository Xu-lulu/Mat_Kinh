const mongoose = require("mongoose");

const Bank = new mongoose.Schema(
  {
    Bankname: {
      type: String,
      require: true,
    },
    Bankaccounts: [
      {
        Banknumber: {
          type: Number,
          require: true,
        },
        Bankaccountname: {
          type: String,
          require: true,
        },
      },
    ],

    deleteAt: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Bank", Bank);
