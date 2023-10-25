import express from 'express';
import Review from '../models/Reviews.model.js';
import mongoose from 'mongoose';

const router = express.Router();

// Create a new review
router.post('/', async (req, res) => {
  try {
    const { rating, comment, foodItem, userId } = req.body;
    const newReview = new Review({
      rating,
      comment,
      foodItem,
      user: new mongoose.Types.ObjectId(userId)  // Convert userId to an ObjectId
    });
    const savedReview = await newReview.save();
    res.status(201).json({message: '${foodItem} has been reviewed with a score of ${rating}'});
  } catch (error) {
    console.error(error);  // Log the error to the console
    res.status(500).json({ error: 'Unable to create the review.' });
  }
});

// Retrieve reviews for a specific food item

router.get('/', async (req, res, next) => {
  try {
    const { foodItem } = req.query;
    console.log(`Querying for reviews of ${foodItem}`);  // Log the foodItem to the console
    const reviews = await Review.find({ foodItem });
    console.log(reviews);  // Log the reviews to the console
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});


// Edit a review
router.put('/:id', async (req, res) => {
  // Your code here...
});

// Delete a review
router.delete('/:id', async (req, res) => {
  // Your code here...
});

export default router;
