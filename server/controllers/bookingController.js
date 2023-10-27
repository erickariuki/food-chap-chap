import Booking from "../model/bookingModel.js";

// Create a new booking
 export const createBooking = async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        email,
        guests,
        date,
        time,
        instruction,
        restaurant_name,
      } = req.body;
  
      const booking = new Booking({
        firstname,
        lastname,
        email,
        guests,
        date,
        time,
        instruction,
        restaurant_name,
      });
  
      const savedBooking = await booking.save();
  
      res.status(201).json(savedBooking);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create a booking', details: error.message });
    }
  };
  
  // Get all bookings
 export const getBookings = async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
    }
  };
  
  // Get a specific booking by ID
 export  const getBookingById = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the booking', details: error.message });
    }
  };

  // Update a booking by ID
 export const updateBooking = async (req, res) => {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      if (!updatedBooking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the booking', details: error.message });
    }
  };
  

  // Delete a booking by ID
export const deleteBooking = async (req, res) => {
    try {
      const deletedBooking = await Booking.findByIdAndRemove(req.params.id);
  
      if (!deletedBooking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      res.status(204).send(); // Successful deletion, no content to return
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the booking', details: error.message });
    }
  };
  