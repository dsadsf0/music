import playlistService from "../services/playlistService.js"
import userSrevice from "../services/userSrevice.js"
import { validationResult } from 'express-validator'

class playlistController {
  async create(req, res) {
    try {
      const err = validationResult(req).errors
      if (err.length) {
        console.log(err);
        return res.status(400).json(err)
      }
      const userId = req.user.id
      const newPlaylist = { title: req.body.title, author: req.user.username, description: req.body.description }
      const { coverFile } = req.files
      const playlist = await playlistService.create(newPlaylist, coverFile)
      const user = await userSrevice.createPlaylitById(userId, playlist._id)
      return res.json(user)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }

  async addSongById(req, res) {
    try {
      const { songId } = req.body
      const playlsitId = req.params.id
      const playlist = await playlistService.addSongById(playlsitId, songId)
      return res.json(playlist)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }

  async removeSongById(req, res) {
    try {
      const { songId } = req.body
      const playlsitId = req.params.id
      const playlist = await playlistService.removeSongById(playlsitId, songId)
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
      console.log(error);
      return res.status(500).json(error)
    }
  }

  async getById(req, res) {
    try {
      const playlist = await playlistService.getById(req.params.id)
      return res.json(playlist)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }

  async getByQuery(req, res) {
    try {
      const playlists = await playlistService.getByQuery(req.params.query)
      return res.json(playlists)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }

  async updateById(req, res) {
    try {
      const updatedPlaylist = await playlistService.update(req.body)
      return res.json(updatedPlaylist)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }

  async deleteById(req, res) {
    try {
      const playlist = await playlistService.deleteById(req.params.id)
      return res.json(playlist)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  }
}

export default new playlistController();