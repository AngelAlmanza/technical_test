import cors from 'cors'

const ACCPETED_ORIGINS = [
  'http://localhost:3000',
  'https://localhost:8000'
]

export const corsMiddleware = () => cors({
  origin: (origin, callback) => {
    if (ACCPETED_ORIGINS.includes(origin)) {
      callback(null, true)
    }
    if (!origin) {
      callback(null, true)
    }
    callback(new Error('Not allowed by CORS'))
  }
})
