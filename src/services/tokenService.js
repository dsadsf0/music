import jwt from 'jsonwebtoken'
import Token from '../models/Token.js'

class tokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: '1h' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken
    } 
  }

  validateAccessToken(token) {
    try {
      const user = jwt.verify(token, process.env.JWT_ACCESS_KEY)
      return user
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const user = jwt.verify(token, process.env.JWT_REFRESH_KEY)
      return user
    } catch (error) {
      return null
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({user:userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const newToken = await Token.create({user: userId, refreshToken})
    return newToken
  }

  async removeToken(refreshToken) {
    const token = await Token.deleteOne({ refreshToken })
    return token
  }

  async findToken(refreshToken) {
    const token = await Token.findOne({ refreshToken })
    return token
  }

}

export default new tokenService()