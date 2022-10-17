import Song from "../models/Song.js";
import CoverFileService from "../fileSevices/CoverFileService.js"
import SongFileService from "../fileSevices/SongFileService.js"

class songService {
  async create(song, songFile, coverFile) {
    if (!songFile) throw new Error('Need song')
    if (!coverFile) throw new Error('Need cover')
    const coverName = CoverFileService.saveCover(coverFile)
    const songName = SongFileService.saveSong(songFile)
    const newSong = await Song.create({ ...song, cover: coverName, src: songName })
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

  async getByQuery(query) {
    if (!query) throw new Error('Need query')
    const songs = await Song.find({
      $or: [
        { name: { $regex: query, $options: 'mi' } },
        { author: { $regex: query, $options: 'mi' } }
      ]
    });
    return songs
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