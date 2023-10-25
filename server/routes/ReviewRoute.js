import express from 'express';
import passport from 'passport';
import Review from '../models/Review';

const router = express.Router();

// Create a new review
router.post('/api/reviews', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { rating, comment, foodItem } = req.body;
    const newReview = new Review({
      rating,
      comment,
      user: req.user._id, // Associate the review with the authenticated user
      foodItem,
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create the review.' });
  }
});

// Retrieve reviews for a specific food item
router.get('/api/reviews', async (req, res) => {
  try {
    const { foodItem } = req.query;
    const reviews = await Review.find({ foodItem });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve reviews.' });
  }
});

// Edit a review
router.put('/api/reviews/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    // Check if the review belongs to the authenticated user
    const review = await Review.findById(reviewId);
    if (!review || review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to edit this review.' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update the review.' });
  }
});

// Delete a review
router.delete('/api/reviews/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Check if the review belongs to the authenticated user
    const review = await Review.findById(reviewId);
    if (!review || review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this review.' });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the review.' });
  }
});

export default router;
