const mongoose = require('mongoose');

const book = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    count: { type: Number, required: true },
    countLeft: { type: Number, required: true },
});

module.exports = mongoose.model('Books', book);