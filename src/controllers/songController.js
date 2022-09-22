import songService from "../services/songService.js"

class songController {
  async create(req, res) {
    try {
      const song = await songService.create(req.body)
      return res.json(song)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async get(req, res) {
    try {
      const song = await songService.getCount(req.query.limit)
      return res.json(song)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async getById(req, res) {
    try {
      const song = await songService.getById(req.params.id)
      return res.json(song)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async updateById(req, res) {
    try {
      const updatedSong = await songService.update(req.body)
      return res.json(updatedSong)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async deleteById(req, res) {
    try {
      const song = await songService.deleteById(req.params.id)
      return res.json(song)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

export default new songController();