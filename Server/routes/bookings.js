const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// 1. CREATE A NEW BOOKING
router.post('/book', async (req, res) => {
    try {
        const { roomId, userId, checkInDate, checkOutDate, totalAmount } = req.body;

        const newBooking = new Booking({
            roomId,
            userId,
            checkInDate,
            checkOutDate,
            totalAmount
        });

        await newBooking.save();

        // After booking, update the room status to 'Booked'
        await Room.findByIdAndUpdate(roomId, { status: 'Booked' });

        res.status(201).json({ msg: "Room booked successfully!", booking: newBooking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET ALL BOOKINGS (For Admin Dashboard)
router.get('/all', async (req, res) => {
    try {
        // .populate helps us see full user and room details instead of just IDs
        const bookings = await Booking.find().populate('userId', 'name email').populate('roomId', 'roomNumber roomType');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// DELETE A BOOKING
router.delete('/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        
        if (!deletedBooking) {
            return res.status(404).json({ msg: "Booking not found" });
        }

        res.json({ msg: "Booking successfully cancelled" });
    } catch (err) {
        console.error("Delete Booking Error:", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;