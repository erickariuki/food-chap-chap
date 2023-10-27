const mongoose = require('mongoose');

const yummypointsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  point: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Yummypoints = mongoose.model('Yummypoints', yummypointsSchema);


export default Yummypoints;
