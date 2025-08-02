import express from 'express'
import urlRoute from './routes/url.js'
import staticRoute from './routes/staticRouter.js'
import { connectToMongoDB } from './connect.js'
import URL from './models/url.js';
import { format } from 'date-fns';
import path from 'path'

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/test')
    .then(() => console.log('MongoDB Connected'))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/url', urlRoute)
app.use('/', staticRoute)

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: format(new Date(), 'dd-MMM-yyyy HH:mm:ss')
                }
            }
        }
    );

    if (!entry) {
        return res.status(404).send("URL not found for this short ID");
    }

    res.redirect(entry.redirectURL);
});


app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`)
})