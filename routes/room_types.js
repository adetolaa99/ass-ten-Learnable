const express = require('express');
const router = express.Router();
const RoomType = require('../models/room_type');

// POST
router.post('/', async (req, res) => {
 const newRoomType = new RoomType({
    name: req.body.name,
 });

 try {
    const roomType = await newRoomType.save();
    res.status(201).json(roomType);
 } catch (err) {
    res.status(400).json({ message: err.message });
 }
});

// GET
router.get('/', async (req, res) => {
 try {
    const roomTypes = await RoomType.find();
    res.json(roomTypes);
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
});

module.exports = router;
