import Playlist from '../models/Playlist.js'
import CoverFileService from "../fileSevices/CoverFileService.js"

class playlistService {
  async create(playlist, cover) {
    if (!cover) throw new Error('Need cover')
    const coverName = CoverFileService.saveCover(cover)
    const newPlaylist = await Playlist.create({...playlist, cover: coverName})
    return newPlaylist
  }

  async addSongById(id, songId) {
    const playlist = await Playlist.findByIdAndUpdate(id, { $addToSet: {songs: songId}}, { new: true });
    return playlist
  }

  async removeSongById(id, songId) {
    const playlist = await Playlist.findByIdAndUpdate(id, { $pull: { songs: songId } }, { new: true });
    return playlist
  }

  async getAll() {
    const playlist = await Playlist.find();
    return playlist
  }

  async getCount(count) {
    const playlist = await Playlist.find().sort('-date').limit(count);
    return playlist
  }

  async getById(id) {
    if (!id) throw new Error('Need id')
    const playlist = await Playlist.findById(id).populate('songs');
    return playlist
  }

  async getByQuery(query) {
    if (!query) throw new Error('Need query')
    const playlists = await Playlist.find({
      $or: [
        { title: { $regex: query, $options: 'mi' } },
        { author: { $regex: query, $options: 'mi' } }
      ]
    });
    return playlists
  }

  async update(playlist) {
    if (!playlist._id) throw new Error('Need id')
    const updatedPlaylist = await Playlist.findByIdAndUpdate(playlist._id, playlist, { new: true })
    return updatedPlaylist
  }

  async deleteById(id) {
    if (!id) throw new Error('Need id')
    const playlist = await Playlist.deleteOne({_id: id})
    return playlist
  }
}

export default new playlistService();