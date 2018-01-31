const mongoose = require('mongoose');

var employee = mongoose.model('employee', {
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        required: true,
        type: String,
        minlength: 1,
        trim: true
    },
    password: {
        required: true,
        type: String,
        trim: true,
        minlength: 5
    },
    userType: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },
    skills: []
}, "employee");

module.exports = { employee };