import { Router } from "express";
import songController from "../controllers/songController.js";
import { body } from 'express-validator'
import authMiddleware from '../middlewares/authMiddleware.js'

const songRouter = new Router();

songRouter.post('/song', 
  authMiddleware,
  body('name')
    .isLength({ min: 2, max: 60 }).withMessage('Song name must be 2-60 characters long'),
   songController.create)
songRouter.get('/song', songController.get)
songRouter.get('/song/:id', songController.getById)
songRouter.get('/songs/:query', songController.getByQuery)
// songRouter.put('/song/:id', songController.updateById)
// songRouter.delete('/song/:id', songController.deleteById)

export default songRouter