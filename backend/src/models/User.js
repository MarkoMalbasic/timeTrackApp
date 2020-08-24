const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    timings: [{
        startTime: String,
        endTime: String,
        elapsedTime: String
    }]
}, {
    timestamps: true
});

module.exports = model('User', userSchema);