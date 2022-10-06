import playlistService from "../services/playlistService.js"

class playlistController {
  async create(req, res) {
    try {
      const playlist = await playlistService.create(req.body)
      return res.json(playlist)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async get(req, res) {
    try {
      const playlist = await playlistService.getCount(req.query.limit)
      return res.json(playlist)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async getById(req, res) {
    try {
      const playlist = await playlistService.getById(req.params.id)
      return res.json(playlist)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async getByQuery(req, res) {
    try {
      const playlists = await playlistService.getByQuery(req.params.query)
      return res.json(playlists)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async updateById(req, res) {
    try {
      const updatedPlaylist = await playlistService.update(req.body)
      return res.json(updatedPlaylist)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async deleteById(req, res) {
    try {
      const playlist = await playlistService.deleteById(req.params.id)
      return res.json(playlist)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

export default new playlistController();