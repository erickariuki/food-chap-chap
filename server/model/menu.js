import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const menuSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true, 
    },
    foodItems: [{
        name: {
            type: String,
            required: true, 
        },
        price: {
            type: Number,
            required: true, 
        },
        description: String,
        image: String,
    }]
}, {
    timestamps: true,
});

const Menu = model('Menu', menuSchema);

export default Menu;
