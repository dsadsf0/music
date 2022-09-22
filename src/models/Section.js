import mongoose from "mongoose";

const Section = new mongoose.Schema({
  title: { type: String, required: true },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}],
})

export default mongoose.model('section', Section)