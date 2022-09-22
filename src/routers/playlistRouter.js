import { Router } from "express";
import playlistController from "../controllers/playlistController.js";

const playlistRouter = new Router();

// playlistRouter.post('/playlist', playlistController.create)
playlistRouter.get('/playlist', playlistController.get)
playlistRouter.get('/playlist/:id', playlistController.getById)
// playlistRouter.put('/playlist/:id', playlistController.updateById)
// playlistRouter.delete('/playlist/:id', playlistController.deleteById)

export default playlistRouter