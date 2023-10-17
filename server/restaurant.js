const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: String,
    location: String,
    contact: String,
    cuisine: String,
    openingHours: String,
    ratings: [Number]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
