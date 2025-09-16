import mongoose from 'mongoose';


const connectDB = async () => {
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/youtube_clone';
await mongoose.connect(uri, {
// options not necessary with Mongoose 6+
});
console.log('MongoDB connected');
};


export default connectDB;