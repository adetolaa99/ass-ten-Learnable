const mongoose = require("mongoose");

const RoomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("RoomType", RoomTypeSchema);
