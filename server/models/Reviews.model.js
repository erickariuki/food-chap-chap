import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,  // rating based on five stars
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true, // rating based on comments
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the users in the User model 
      required: true,
    },
    foodItem: {
      type: String,
      required: true, // Reference to the foodItems in the menu model 
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
