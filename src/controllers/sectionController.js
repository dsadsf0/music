import sectionService from "../services/sectionService.js"

class sectionController {
  async create(req, res) {
    try {
      const section = await sectionService.create(req.body)
      return res.json(section)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async get(req, res) {
    try {
      const section = await sectionService.getCount(req.query.limit)
      return res.json(section)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async getById(req, res) {
    try {
      const section = await sectionService.getById(req.params.id)
      return res.json(section)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async updateById(req, res) {
    try {
      const updatedsection = await sectionService.update(req.body)
      return res.json(updatedsection)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async deleteById(req, res) {
    try {
      const section = await sectionService.deleteById(req.params.id)
      return res.json(section)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

export default new sectionController();