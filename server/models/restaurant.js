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
    permitDocument: {
        type: String, 
        required: true,
    },
    taxDocument: {
        type: String, // You may want to store the file path or URL
        required: true,
    },
    fireClearanceCertificate: {
        type: String, // You may want to store the file path or URL
        required: true,
    },
    advertisingSignageLicense: {
        type: String, // You may want to store the file path or URL
        required: true,
    },
    healthCertificate: {
        type: String, // You may want to store the file path or URL
        required: true,
    },
}, {
    timestamps: true,
});

const Restaurant = model('Restaurant', restaurantSchema);

export default Restaurant;
