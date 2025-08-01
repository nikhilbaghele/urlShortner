import express from 'express'
import urlRoute from './routes/url.js'
import { connectToMongoDB } from './connect.js'
import URL from './models/url.js';
import { format } from 'date-fns';

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/test')
    .then(() => console.log('MongoDB Connected'))

app.use(express.json());

app.use('/url', urlRoute)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push:{
                visitHistory:{
                    timestamp: format(new Date(), 'dd-MMM-yyyy HH:mm:ss')
                }
            }
        }
    )
    res.redirect(entry.redirectURL)
})

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`)
})