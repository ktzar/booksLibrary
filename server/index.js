const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const dotenv = require('dotenv').config();
const { DB_FILE, PORT } = process.env;


const database = new sqlite3.Database(DB_FILE)
const app = express()
app.get('/search/:query', (req, res) => {
    const { query } = req.params
    database.all(
        statements.search,
        [`%${query}%`, `%${query}%`, query],
        async (err, rows) => {
            res.send(rows);
        }
    )
})
app.get('/return/:isbn', (req, res) => {
    const { isbn } = req.params
    database.run(
        statements.return, [isbn],
        async (err, rows) => {
            console.log(err, rows)
            res.send(rows);
        }
    )
})
app.get('/take/:isbn', (req, res) => {
    const { isbn } = req.params
    database.run(
        statements.take, [isbn],
        async (err, rows) => {
            console.log(err, rows)
            res.send(rows);
        }
    )
})
console.log(process.env)

const statements = {
    search: 'select * from books where title like ? or author like ? or isbn = ?;',
    return: 'update books set state = "available" where id in (select id from books where isbn = ? and state = "due" limit 1);',
    take: 'update books set state = "due" where id in (select id from books where isbn = ? and state = "available" limit 1);',
}

database.serialize(() => {
    app.listen(PORT)
    console.log("Listening on port " + PORT)
});

