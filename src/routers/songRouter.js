import { Router } from "express";
import songController from "../controllers/songController.js";
import authMiddleware from '../middlewares/authMiddleware.js'

const songRouter = new Router();

// songRouter.post('/song', songController.create)
songRouter.get('/song', songController.get)
songRouter.get('/song/:id', songController.getById)
songRouter.get('/songs/:query', songController.getByQuery)
// songRouter.put('/song/:id', songController.updateById)
// songRouter.delete('/song/:id', songController.deleteById)

export default songRouter