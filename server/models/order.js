import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true, 
    },
    foodItems: [{
        food: {
            type: Schema.Types.ObjectId,
            ref: 'Food',
            required: true, 
        },
        quantity: {
            type: Number,
            required: true, 
        },
    }],
    totalPrice: Number,
    status: {
        type: String,
        enum: ['pending', 'preparing', 'delivered'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

const Order = model('Order', orderSchema);

export default Order;
