import { Router } from "express";
import userController from "../controllers/userController.js";
import { body } from 'express-validator'
import authMiddleware from '../middlewares/authMiddleware.js'

const userRouter = new Router();

userRouter.post('/signup', 
  body('user[email]').isEmail().withMessage('Incorrect email'),
  body('user[password]')
    .isLength({ min: 6, max: 30 }).withMessage('Password must be 6-30 characters long'),
  body('user[username]')
    .isLength({ min: 4, max: 30 }).withMessage('Username must be 4-30 characters long')
    .isAlphanumeric().withMessage('Username may be contain a-z, A-Z, 0-9 only'),
  userController.create)
userRouter.post('/login',
  body('username')
    .isLength({ min: 4, max: 30 }).withMessage('Username must be 4-30 characters long')
    .isAlphanumeric().withMessage('Username may be contain a-z, A-Z, 0-9 only'),
  body('password')
    .isLength({ min: 6, max: 30 }).withMessage('Password must be 6-30 characters long'),
  userController.login)
userRouter.post('/logout', userController.logout)
userRouter.get('/refresh', userController.refreshToken)
userRouter.get('/user/:id', authMiddleware, userController.getById)
userRouter.put('/user/like', authMiddleware, userController.likeSongById)
// userRouter.put('/user/:id', authMiddleware, userController.updateById)
userRouter.delete('/user/:id', authMiddleware, userController.deleteById)
// userRouter.post('/user/like', authMiddleware, userController.like)

export default userRouter