const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId, // Connects to the Room's unique ID
        ref: 'Room',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Connects to the User's unique ID
        ref: 'User',
        required: true
    },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    bookingStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Confirmed'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);