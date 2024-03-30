const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

  verfiytoken: {
    type: String,
  },

  isAdmin: {
    type: Boolean,
    require: true,
  },
});

mongoose.model("login", userSchema);
