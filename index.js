import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import env from 'dotenv'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload';
import playlistRouter from './src/routers/playlistRouter.js';
import sectionRouter from './src/routers/sectionRouter.js'
import songRouter from './src/routers/songRouter.js'
import userRouter from './src/routers/userRouter.js'
import userSrevice from './src/services/userSrevice.js'

env.config()

const app = express()

app.use(express.json())
app.use(fileUpload({}))
app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
}))

app.use(cookieParser())
app.use('/api', playlistRouter)
app.use('/api', sectionRouter)
app.use('/api', songRouter)
app.use('/api', userRouter)

app.use('/music', express.static('music'))
app.use('/covers', express.static('covers'))

const PORT = process.env.PORT || 3001
const DB_URL = process.env.DB_URL

async function startApp() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => { console.log(`SERVER START ON PORT: ${PORT}`); })
  } catch (error) {
    console.log(error)
  }
}

startApp()