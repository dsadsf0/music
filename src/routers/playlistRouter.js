import { Router } from "express";
import playlistController from "../controllers/playlistController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { body } from 'express-validator'

const playlistRouter = new Router();

playlistRouter.post('/playlist', 
  authMiddleware,
  body('title')
    .isLength({ min: 2, max: 60 }).withMessage('Playlist title must be 2-60 characters long'),
  body('description')
    .isLength({ min: 2, max: 120 }).withMessage('Playlist description must be 2-60 characters long'),
   playlistController.create)
playlistRouter.get('/playlist', playlistController.get)
playlistRouter.get('/playlist/:id', playlistController.getById)
playlistRouter.get('/playlists/:query', playlistController.getByQuery)
playlistRouter.put('/playlist/update/:id', authMiddleware, playlistController.updateById)
playlistRouter.put('/playlist/addSong/:id', authMiddleware, playlistController.addSongById)
playlistRouter.put('/playlist/removeSong/:id', authMiddleware, playlistController.removeSongById)
// playlistRouter.delete('/playlist/:id', authMiddleware, playlistController.deleteById)

export default playlistRouter