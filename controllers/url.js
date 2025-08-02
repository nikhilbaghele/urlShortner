import { nanoid } from "nanoid";
import URL from '../models/url.js'

export const handleGenerateNewShortURL = async (req, res) => {
    const { url } = req.body || {};
    if (!url) return res.status(400).json({ error: "URL is required" });

    const shortId = nanoid(8);

    await URL.create({
        shortId: shortId,
        redirectURL: url,
        visitHistory: []
    })

    return res.render("home", {id: shortId})
}

export const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}