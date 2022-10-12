import User from "../models/user.js";
import bcrypt from 'bcrypt'
import tokenService from "./tokenService.js";

class userService {
  dto(user) {
    const dtoUser = { id: user._id, email: user.email, username: user.username, likedSongs: user.likedSongs, likedPlaylists: user.likedPlaylists }
    return dtoUser
  }
  async dtoAndToken(user) {
    const dtoUser = this.dto(user)

    const tokens = tokenService.generateToken(dtoUser)
    await tokenService.saveToken(dtoUser.id, tokens.refreshToken)

    return { ...tokens, user: dtoUser }
  }

  async create(user) {
    const email = await User.findOne({ email: user.email })
    if (email) throw 'This email already used'

    const name = await User.findOne({ username: user.username })
    if (name) throw 'This username already used'

    const hashPassword = await bcrypt.hash(user.password, 5)

    const newUser = await User.create({ email: user.email, username: user.username, password: hashPassword })
    const res = await this.dtoAndToken(newUser)

    return res;
  }

  async login(username, password) {
    const user = await User.findOne({ username })
    if (!user) throw 'This username is not exist'

    const isCorrectPass = await bcrypt.compare(password, user.password)
    if (!isCorrectPass) throw 'Invalid password'

    const res = await this.dtoAndToken(user)

    return res;
  }

  async logout(refreshToken) {
    const res = await tokenService.removeToken(refreshToken)
    return res;
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) throw 'User not authorized'

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenDB = await tokenService.findToken(refreshToken)

    if (!userData || !tokenDB) throw 'Invalid token'

    const user = await User.findById(userData.id)
    const res = await this.dtoAndToken(user)
    
    return res;
  }

  async getById(id) {
    if (!id) throw new Error('Need id')
    const user = await User.findById(id);
    return this.dto(user)
  }

  async likeSongById(userId, songId) {
    let user = await User.findById(userId)
    if (!user.likedSongs.includes(songId)) {
      user = await User.findByIdAndUpdate(userId, { $addToSet: { likedSongs: songId }})
    } else {
      user = await User.findByIdAndUpdate(userId, { $pull: { likedSongs: songId } })
    }
    return this.dto(user)
  }

  async likePlaylistById(userId, playlistId) {
    let user = await User.findById(userId)
    if (!user.likedPlaylists.includes(playlistId)) {
      user = await User.findByIdAndUpdate(userId, { $addToSet: { likedPlaylists: playlistId } })
    } else {
      user = await User.findByIdAndUpdate(userId, { $pull: { likedPlaylists: playlistId } })
    }
    return this.dto(user)
  }

  // async update(user) {
  //   if (!user._id) throw new Error('Need id')
  //   const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true })
  //   const res = await this.dtoAndToken(updatedUser)
  //   return res;
  // }

  async delete(id, token) {
    if (!id) throw new Error('Need id')
    await User.deleteById(id)
    await tokenService.removeToken(token)
    return null;
  }
}

export default new userService();