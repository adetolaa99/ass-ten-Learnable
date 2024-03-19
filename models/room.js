const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
 },
 roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true,
 },
 price: {
    type: Number,
    required: true,
 },
});

module.exports = mongoose.model('Room', RoomSchema);
