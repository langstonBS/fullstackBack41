const mongoose = require('mongoose');


const cerealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thoughts: {
    type: String,
  },
  scale: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String]
  }
});

module.exports = mongoose.model('Cereal', cerealSchema);
