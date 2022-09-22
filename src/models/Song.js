import mongoose from "mongoose";

const Song = new mongoose.Schema({
  author: { type: String, required: true },
  songName: { type: String, required: true },
  songFile: { type: String, required: true },
  cover: { type: String },
})

export default mongoose.model('song', Song)