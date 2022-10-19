import mongoose from "mongoose";

const Playlist = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song', required: true}], 
  description: { type: String, required: true},
  cover: { type: String, required: true },
})

export default mongoose.model('playlist', Playlist)