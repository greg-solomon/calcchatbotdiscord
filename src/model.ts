import mongoose from 'mongoose';

const Model = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  book: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Guild Pairs', Model);
