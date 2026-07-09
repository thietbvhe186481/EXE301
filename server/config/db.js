import mongoose from 'mongoose';

export async function connectDb() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_career_demo';
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
  return mongoose.connection;
}
