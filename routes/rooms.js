const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const RoomType = require('../models/room_type');

// POST
router.post('/', async (req, res) => {
 const { name, roomType, price } = req.body;

 try {
    const roomTypeExists = await RoomType.findById(roomType);
    if (!roomTypeExists) {
      return res.status(400).json({ message: 'Room type not found' });
    }

    const newRoom = new Room({
      name,
      roomType,
      price,
    });

    const room = await newRoom.save();
    res.status(201).json(room);
 } catch (err) {
    res.status(400).json({ message: err.message });
 }
});

// GET
router.get('/', async (req, res) => {
 const { search, roomType, minPrice, maxPrice } = req.query;

 try {
    const query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (roomType) query.roomType = roomType;
    if (minPrice) query.price = { $gte: parseFloat(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: parseFloat(maxPrice) };

    const rooms = await Room.find(query);
    res.json(rooms);
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
});

// PATCH
router.patch('/:roomId', async (req, res) => {
 const { roomId } = req.params;
 const updates = Object.keys(req.body);
 const allowedUpdates = ['name', 'roomType', 'price'];
 const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

 if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
 }

 try {
    const room = await Room.findByIdAndUpdate(roomId, req.body, { new: true, runValidators: true });

    if (!room) {
      return res.status(404).send();
    }

    res.send(room);
 } catch (err) {
    res.status(400).send(err);
 }
});

// DELETE
router.delete('/:roomId', async (req, res) => {
 const { roomId } = req.params;

 try {
    const room = await Room.findByIdAndDelete(roomId);

    if (!room) {
      return res.status(404).send();
    }

    res.send(room);
 } catch (err) {
    res.status(500).send(err);
 }
});

// GET
router.get('/:roomId', async (req, res) => {
 const { roomId } = req.params;

 try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).send();
    }

    res.send(room);
 } catch (err) {
    res.status(500).send(err);
 }
});

module.exports = router;
