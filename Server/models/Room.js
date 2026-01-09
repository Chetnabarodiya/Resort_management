const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    roomType: { 
        type: String, 
        enum: ['Single', 'Double', 'Deluxe', 'Suite'], 
        required: true 
    },
    price: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Available', 'Booked'], 
        default: 'Available' 
    },
    facilities: [String], // Array of strings like ["AC", "WiFi"]
    images: [String],     // Array of image URLs
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);