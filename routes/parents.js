const express = require('express');
const router = express.Router();
const Parent = require('../models/Parent');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.studentId = decoded.studentId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

// Get all parents for a student
router.get('/', auth, async (req, res) => {
    try {
        const parents = await Parent.find({ student: req.studentId });
        res.json(parents);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new parent
router.post('/', auth, async (req, res) => {
    try {
        const parent = new Parent({
            ...req.body,
            student: req.studentId
        });
        await parent.save();
        res.status(201).json(parent);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a parent
router.put('/:id', auth, async (req, res) => {
    try {
        const parent = await Parent.findOneAndUpdate(
            { _id: req.params.id, student: req.studentId },
            req.body,
            { new: true }
        );
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.json(parent);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a parent
router.delete('/:id', auth, async (req, res) => {
    try {
        const parent = await Parent.findOneAndDelete({
            _id: req.params.id,
            student: req.studentId
        });
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.json({ message: 'Parent deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 