import Song from "../models/Song.js";

class songService {
  async create(song) {
    const newSong = await Song.create(song)
    return newSong
  }

  async getAll() {
    const song = await Song.find();
    return song
  }

  async getCount(count) {
    const song = await Song.find().sort('-date').limit(count);
    return song
  }

  async getById(id) {
    if (!id) throw new Error('Need id')
    const playlist = await Song.findById(id);
    return playlist
  }

  async update(song) {
    if (!song._id) throw new Error('Need id')
    const updatedSong = await Song.findByIdAndUpdate(song._id, song, { new: true })
    return res.json(updatedSong)

  }

  async deleteById(id) {
    if (!id) throw new Error('Need id')
    const song = await Song.deleteById(id)
    return res.json(song)
  }
}

export default new songService();