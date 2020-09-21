/* eslint-disable max-len */
import mongoose from 'mongoose';
/**
 * Connects MongoDB
 */
export default async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (mongoUri) {
      await mongoose.connect(mongoUri, {useUnifiedTopology: true, useNewUrlParser: true});
    }
  } catch (err) {
    console.error(err.message);
  }
}
