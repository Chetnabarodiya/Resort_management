const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// 1. ADD NEW ROOM (Admin Only logic will be added later)
router.post('/add', async (req, res) => {
    try {
        const { roomNumber, roomType, price, facilities, images, description } = req.body;

        const newRoom = new Room({
            roomNumber,
            roomType,
            price,
            facilities,
            images,
            description
        });

        await newRoom.save();
        res.status(201).json({ msg: "Room added successfully!", room: newRoom });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET ALL ROOMS (For both User and Admin)
router.get('/all', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. DELETE A ROOM
router.delete('/:id', async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ msg: "Room deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// UPDATE ROOM
router.put('/update/:id', async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;