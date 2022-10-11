import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song' }],
})

export default mongoose.model('user', User)