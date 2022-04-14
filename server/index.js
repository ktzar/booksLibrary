const dotenv = require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const express = require('express');

const { DB_FILE, PORT, PUBLIC_PATH } = process.env;

const library = require('./library');

const database = new sqlite3.Database(DB_FILE)
const app = express()

app.use(express.static(PUBLIC_PATH))
app.use('/api', library({database}))
app.use('/', library({database}))
app.use((req, res, next) => {
    console.log('Received ' + req.url);
    next()
});


app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})
