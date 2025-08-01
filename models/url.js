import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  timestamp: {
    type: String, // or Date if you prefer native timestamps
    required: true,
  }
});

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [visitSchema]
});

const URL = mongoose.model('url', urlSchema);
export default URL;