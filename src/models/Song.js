import mongoose from "mongoose";

const Song = new mongoose.Schema({
  author: { type: String, required: true },
  name: { type: String, required: true },
  src: { type: String, required: true },
  cover: { type: String },
})

export default mongoose.model('song', Song)