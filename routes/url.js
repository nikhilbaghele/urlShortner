import express from 'express'
import {handleGenerateNewShortURL, handleGetAnalytics} from '../controllers/url.js'
const router = express.Router()

router.get('/', handleGenerateNewShortURL)

router.get('/analytics/:shortId', handleGetAnalytics)

export default router