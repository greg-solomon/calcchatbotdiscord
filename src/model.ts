import mongoose from 'mongoose';

export interface GuildModel extends mongoose.Document {
  guildId: string;
  book: string;
}
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

export default mongoose.model<GuildModel>('Guild Pairs', Model);
