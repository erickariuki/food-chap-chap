import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    openingHours: {
        type: String,
        required: true,
    },
    ratings: [Number],
}, {
    timestamps: true,
});

const Restaurant = model('Restaurant', restaurantSchema);

export default Restaurant;
