import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('successfully connected to database')
    } catch (err) {
        console.log('failure in database connection')
    }
};

export default connectDB;