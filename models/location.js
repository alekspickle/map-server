const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LocationSchema = new Schema(
  {
    name: {
      type: String, required: true
    },
    type: {
      type: String
    },
    lat: {
      type: Number, required: true
    },
    lng: {
      type: Number, required: true
    },

    user_id: {
      type: Number, required: true
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", LocationSchema);
