const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    parents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema); 