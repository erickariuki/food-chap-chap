const orderSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    foodItems: [{
        food: { type: Schema.Types.ObjectId, ref: 'Food' },
        quantity: Number
    }],
    totalPrice: Number,
    status: {
        type: String,
        enum: ['pending', 'preparing', 'delivered'],
        default: 'pending'
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
