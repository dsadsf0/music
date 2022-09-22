import userService from '../services/userSrevice.js'
import {validationResult} from 'express-validator'

class userController {
  async create(req, res) {
    try {
      const err = validationResult(req).errors
      if (err.length) {
        return res.status(400).json(err)
      }
      const newUser = req.body.user
      const user = await userService.create(newUser)
      res.cookie('refreshToken', user.refreshToken, {maxAge: 1000*60*60*24*30, httpOnly: true, SameSite: 'none', secure: false })
      return res.json(user)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  async login(req, res) {
    try {
      const err = validationResult(req).errors
      if (err.length) {
        return res.status(400).json(err)
      }
      const {username, password} = req.body
      const user = await userService.login(username, password)
      res.cookie('refreshToken', user.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true, SameSite: 'none', secure: false })
      return res.json(user)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies
      await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json('ok')
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies
      const user = await userService.refreshToken(refreshToken)
      res.cookie('refreshToken', user.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true, SameSite: 'none', secure: false })
      return res.json(user)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id
      const user = await userService.getById(id)
      return res.json(user)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  // async updateById(req, res) {
  //   try {
  //     const user = req.body.user
  //     const updatedUser = await userService.update(user)
  //     res.cookie('refreshToken', updatedUser.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true, SameSite: 'none', secure: false })
  //     return res.json(updatedUser)
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json(error)
  //   }
  // }

  async deleteById(req, res) {
    try {
      const id = req.params.id
      const { refreshToken } = req.cookies
      await userService.delete(id, refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  // async like(req, res) {
  //   try {
  //     const songId = req.body.id
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json(error)
  //   }
  // }
}

export default new userController();