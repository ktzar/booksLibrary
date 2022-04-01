const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const library = require('./library');
const dotenv = require('dotenv').config();
const { DB_FILE, PORT, PUBLIC_PATH } = process.env;


const database = new sqlite3.Database(DB_FILE)
const app = express()

app.use(express.static(PUBLIC_PATH))
app.use('/api', library({database}))


app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})
