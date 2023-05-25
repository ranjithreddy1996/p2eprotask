const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  duration: { type: Number, required: true },
  isBooked: { type: Boolean,  default: false }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
