import mongoose from 'mongoose';

export function mongoUriFromEnvironment(env = process.env) {
  if (env.MONGODB_URI) return env.MONGODB_URI;
  const { MONGODB_USERNAME: username, MONGODB_PASSWORD: password, MONGODB_HOST: host } = env;
  if (!username || !password || !host) return null;
  const database = env.MONGODB_DATABASE || 'portfolio_career';
  if (!/^[a-z\d.-]+$/i.test(host) || !/^[a-z\d_-]+$/i.test(database)) {
    throw new Error('Invalid MongoDB host or database name.');
  }
  return `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}/${database}?retryWrites=true&w=majority`;
}

export async function connectDb() {
  const uri = mongoUriFromEnvironment() || 'mongodb://127.0.0.1:27017/portfolio_career_demo';
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
  return mongoose.connection;
}
