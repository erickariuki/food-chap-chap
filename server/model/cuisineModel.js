import mongoose from "mongoose";

const cuisineSchema = new mongoose.Schema({
    name: String,
    created_at: { type: Date, default: Date.now },
  });
  
  const Cuisine =  mongoose.model('Cuisine', cuisineSchema);

 export default Cuisine;