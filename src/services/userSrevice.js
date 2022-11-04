import User from "../models/user.js";
import bcrypt from 'bcrypt'
import tokenService from "./tokenService.js";
import { ObjectId } from 'mongodb';
import playlistService from "./playlistService.js";
import CoverFileService from "../fileSevices/CoverFileService.js";

class userService {
  dto(user) {
    const dtoUser = { 
      id: user._id, 
      email: user.email, 
      username: user.username, 
      likedSongs: user.likedSongs, 
      likedPlaylists: user.likedPlaylists,
      uploadedSongs: user.uploadedSongs,
      createdPlaylists: user.createdPlaylists,
    }
    return dtoUser
  }

  async dtoAndToken(user) {
    const dtoUser = {id: user._id, email: user.email, username: user.username}
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

    return { accessToken: res.accessToken, refreshToken: res.refreshToken, user: this.dto(newUser) };
  }

  async login(username, password) {
    const user = await User.findOne({ username })
      .populate('likedSongs')
      .populate('likedPlaylists')
      .populate('uploadedSongs')
      .populate('createdPlaylists')
    if (!user) throw 'This username is not exist'

    const isCorrectPass = await bcrypt.compare(password, user.password)
    if (!isCorrectPass) throw 'Invalid password'
    const res = await this.dtoAndToken(user)
    
    return { accessToken: res.accessToken, refreshToken: res.refreshToken, user: this.dto(user) };
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
      .populate('likedSongs')
      .populate('likedPlaylists')
      .populate('uploadedSongs')
      .populate('createdPlaylists')
    const res = await this.dtoAndToken(user)
    return { accessToken: res.accessToken, refreshToken: res.refreshToken, user: this.dto(user) };
  }

  async getById(id) {
    if (!id) throw new Error('Need id')
    const user = await User.findById(id)
      .populate('likedSongs')
      .populate('likedPlaylists')
      .populate('uploadedSongs')
      .populate('createdPlaylists')
    return this.dto(user)
  }

  async likeSongById(userId, songId) {
    let user = await User.findById(userId)
    if (!user.likedSongs.includes(songId)) {
      user = await User.findByIdAndUpdate(userId, { $addToSet: { likedSongs: songId } }, { new: true })
    } else {
      user = await User.findByIdAndUpdate(userId, { $pull: { likedSongs: songId } }, { new: true })
    }

    user = await User.findById(userId)
      .populate('likedSongs')
      .populate('likedPlaylists')
      .populate('uploadedSongs')
      .populate('createdPlaylists')
    return this.dto(user)
  }

  async likedSongs(userId) {
    const songs = await User.findById(userId).populate('likedSongs')
    return songs.likedSongs
  }
  
  async likePlaylistById(userId, playlistId) {
    let user = await User.findById(userId)
    if (!user.likedPlaylists.includes(playlistId)) {
      user = await User.findByIdAndUpdate(userId, { $addToSet: { likedPlaylists: playlistId } }, { new: true })
    } else {
      user = await User.findByIdAndUpdate(userId, { $pull: { likedPlaylists: playlistId } }, { new: true })
    }
    user = await User.findById(userId)
      .populate('likedSongs')
      .populate('likedPlaylists')
      .populate('uploadedSongs')
      .populate('createdPlaylists')
    return this.dto(user)
  }
  
  async likedPlaylists(userId) {
    const user = await User.findById(userId).populate('likedPlaylists')
    return user.likedPlaylists
  }

  async uploadSongById(userId, songId) {
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { uploadedSongs: songId } }, { new: true })
      .populate('likedSongs')
      .populate('likedPlaylists')
      .populate('uploadedSongs')
      .populate('createdPlaylists')
    return this.dto(user)
  }

  async uploadedSongs(userId) {
    const songs = await User.findById(userId).populate('uploadedSongs')
    return songs.uploadedSongs
  }

  async createPlaylitById(userId, playlistId) {
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { createdPlaylists: playlistId } }, { new: true })
      .populate('likedSongs')
      .populate('likedPlaylists')
      .populate('uploadedSongs')
      .populate('createdPlaylists')
    return this.dto(user)
  }

  async createdPlaylists(userId) {
    const playlists = await User.findById(userId).populate('createdPlaylists')
    return playlists.createdPlaylists
  }
  
  async deletePlaylist(userId, playlistId) {
    let user = await User.findById(userId)
    const objId = new ObjectId(playlistId)
    if (user.createdPlaylists.includes(objId)) {
      await User.updateMany({ $in: { likedPlaylists: playlistId } }, { $pull: { likedPlaylists: playlistId } })    
      user = await User.findByIdAndUpdate(userId, { $pull: { createdPlaylists: playlistId } }, {new: true})
      const playlist = await playlistService.deleteById(playlistId)
      CoverFileService.removeCover(playlist.cover)
    }
    user = await User.findById(userId).populate('likedSongs').populate('likedPlaylists').populate('uploadedSongs').populate('createdPlaylists')
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