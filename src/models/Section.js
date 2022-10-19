import mongoose from "mongoose";

const Section = new mongoose.Schema({
  title: { type: String, required: true },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'playlist'}],
})

export default mongoose.model('section', Section)