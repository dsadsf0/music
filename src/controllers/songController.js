import songService from "../services/songService.js"
import userSrevice from "../services/userSrevice.js"
import { validationResult } from 'express-validator'

class songController {
  async create(req, res) {
    try {
      const err = validationResult(req).errors
      if (err.length) {
        console.log(err);
        return res.status(400).json(err)
      }
      const userId = req.user.id      
      const newSong = {name: req.body.name, author: req.body.author}
      const { songFile, coverFile } = req.files
      const song = await songService.create(newSong, songFile, coverFile)
      const user = await userSrevice.uploadSongById(userId, song._id)
      console.log('------------------------------')
      console.log(`\u001b[1;35m${new Date().toLocaleString()}\u001b[0m`)
      console.log(`song \u001b[1;35m${song.name}\u001b[0m uploaded`)
      console.log('------------------------------')
      return res.json(user)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }

  async get(req, res) {
    try {
      const song = await songService.getCount(req.query.limit)
      return res.json(song)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }

  async getById(req, res) {
    try {
      const song = await songService.getById(req.params.id)
      return res.json(song)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }

  async getByQuery(req, res) {
    try {
      const songs = await songService.getByQuery(req.params.query)
      return res.json(songs)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }

  async updateById(req, res) {
    try {
      const updatedSong = await songService.update(req.body)
      return res.json(updatedSong)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }

  async deleteById(req, res) {
    try {
      const song = await songService.deleteById(req.params.id)
      return res.json(song)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }
}

export default new songController();