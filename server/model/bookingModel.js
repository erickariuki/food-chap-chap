import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true, // Make the field required
    trim: true, // Trim leading and trailing whitespace
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Convert email to lowercase
    validate: {
      validator: function (value) {
        // Custom email validation logic
        // You can use a library like 'validator' for more robust email validation
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email address',
    },
  },
  guests: {
    type: Number,
    required: true,
    min: 1, // Minimum value
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
    maxlength: 200, // Maximum 200 characters
  },
  restaurant_name: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default  Booking;
