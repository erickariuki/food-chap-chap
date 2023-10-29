import mongoose from 'mongoose';
import ENV from '../config.js';

async function connect() {
    try {
        await mongoose.connect(ENV.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas:', error);
    }
}

export default connect;
