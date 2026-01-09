const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // New: Import mongoose
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);


// --- DATABASE CONNECTION ---
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log("MongoDB database connection established successfully!"))
    .catch(err => console.log("Database connection error:", err));

app.get('/', (req, res) => {
    res.send("Server and Database are connected!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});