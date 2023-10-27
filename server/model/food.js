import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cuisine_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  foodtype: {
    type: String,
    enum: ['0', '1', '2'], // Example enum values
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
