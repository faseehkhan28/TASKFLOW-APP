import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { connectDB } from './config/db'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  const dbConnected = mongoose.connection.readyState === 1
  res.json({
    status: 'ok',
    database: dbConnected ? 'connected' : 'disconnected',
  })
})

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()