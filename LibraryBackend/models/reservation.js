const mongoose = require('mongoose');

const reservation = mongoose.Schema({
  bookId: { type: String, required: true },
  userName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model('Reservations', reservation);