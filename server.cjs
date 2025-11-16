require('dotenv').config()
const express = require('express');
const path = require('path');
const { addRecord, fetchRecords } = require('./db.cjs')

const app = express()
const port = process.env.PORT;

// set middlewares
app.use(express.static("dist"))
app.use(express.json())
if (process.env.DEBUG) {
    import('cors').then(cors => app.use(cors.default()))
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/api/employees/new", async (req, res) => {
    const fields = {
        name: req.body?.name?.trim(),
        email: req.body?.email?.trim(),
        department: req.body?.department?.trim(),
        designation: req.body?.designation?.trim(),
    }
    // validation checks
    for (const k in fields) {
        if (!fields[k]) {
            res.status(400).json({
                error: `${k} is a required field.`
            })
            return;
        } 
    }

    const { success, message } = await addRecord(fields);
    if (!success) {
        res.status(400).json({
            error: message
        })
        return;
    }

    res.sendStatus(201);
})

app.get("/api/employees", async (req, res) => {
    let { page } = req.query;
    page = parseInt(page);
    if (page <= 0) {
        res.status(400).json({
            error: "Please pass a valid page number > 0"
        })
        return;
    }

    const result = await fetchRecords(page || 1);
    res.json({
        ...result
    })
})

app.listen(port, () => {
    console.log("Server started ✅")
})