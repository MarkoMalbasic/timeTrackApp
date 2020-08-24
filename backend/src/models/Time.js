const { Schema, model } = require('mongoose');

const timeSchema = new Schema({
    startTime: String,
    endTime: String,
    elapsedTime: String
}, {
    timestamps: true
});

module.exports = model('Time', timeSchema);