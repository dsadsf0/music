import Section from "../models/Section.js";

class sectionService {
  async create(section) {
    const newSection = await Section.create(playlist)
    return newSection
  }

  async getAll() {
    const section = await Section.find();
    return section
  }

  async getCount(count) {
    const section = await Section.find().sort('-date').limit(count);
    return section
  }

  async getById(id) {
    if (!id) throw new Error('Need id')
    const playlist = await Section.findById(id);
    return playlist
  }

  async update(section) {
    if (!section._id) throw new Error('Need id')
    const updatedSection = await Section.findByIdAndUpdate(section._id, section, { new: true })
    return res.json(updatedSection)

  }

  async deleteById(id) {
    if (!id) throw new Error('Need id')
    const section = await Section.deleteById(id)
    return res.json(section)
  }
}

export default new sectionService();