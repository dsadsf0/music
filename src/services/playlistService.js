import Playlist from '../models/Playlist.js'

class playlistService {
  async create(playlist) {
    const newPlaylist = await Playlist.create(playlist)
    return newPlaylist
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
    return res.json(updatedPlaylist)

  }

  async deleteById(id) {
    if (!id) throw new Error('Need id')
    const playlist = await Playlist.deleteById(id)
    return res.json(playlist)
  }
}

export default new playlistService();