const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER ROUTE
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // Hash the password for database safety
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance
        user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'user' // Default to 'user' if not provided
        });

        await user.save();
        res.status(201).json({ msg: "User registered successfully!" });

    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(500).send("Server Error");
    }
});

// 2. LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        // Create a JWT Token with user ID and role
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        // Send token and user info to frontend
        res.json({
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).send("Server Error");
    }
});

// 3. GET ALL USERS (Added for Admin Dashboard)
router.get('/all', async (req, res) => {
    try {
        // Fetch all users but hide the password field
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error("Fetch Users Error:", err.message);
        res.status(500).send("Server Error");
    }
});

// 2. LOGIN ROUTE (Updated)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        // FIX: Include name, email, and phone in the token payload
        const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role,
                name: user.name,
                email: user.email,
                phone: user.phone 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });

    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Get User by ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// UPDATE USER PROFILE
router.put('/update/:id', async (req, res) => {
    try {
        const { name, phone } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { name, phone } },
            { new: true }
        ).select('-password');
        
        res.json(updatedUser);
    } catch (err) {
        res.status(500).send("Server Error during update");
    }
});

module.exports = router;