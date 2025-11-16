import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
const app = express()

const port = process.env.PORT;

app.use(express.static("dist"))
app.use(express.json())

if (process.env.DEBUG) {
    import('cors').then(cors => app.use(cors.default()))
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(port, () => {
    console.log("Server started ✅")
})