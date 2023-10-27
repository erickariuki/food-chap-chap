import express from 'express';
import {
    createBooking,
    getBookings,
    getBookingById,
    deleteBooking,
    updateBooking
} from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/', createBooking);
bookingRouter.get('/', getBookings);
bookingRouter.get('/:id', getBookingById);
bookingRouter.put('/:id',updateBooking);
bookingRouter.delete('/:id', deleteBooking);

export default bookingRouter;