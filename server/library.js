const express = require('express');
module.exports = function library({database}) {
    const router = express.Router()

    router.get('/search/:query', (req, res) => {
        const { query } = req.params
        database.all(
            statements.search,
            [`%${query}%`, `%${query}%`, query],
            async (err, rows) => {
                res.send(rows);
            }
        )
    })
    router.get('/author/:query', (req, res) => {
        const { query } = req.params
        database.all(
            statements.author,
            [query],
            async (err, rows) => {
                res.send(rows);
            }
        )
    })
    router.get('/category/:query', (req, res) => {
        const { query } = req.params
        database.all(
            statements.category,
            [query],
            async (err, rows) => {
                res.send(rows);
            }
        )
    })
    router.get('/return/:isbn', (req, res) => {
        const { isbn } = req.params
        database.run(
            statements.return, [isbn],
            async (err, rows) => {
                console.log(err, rows)
                res.send(rows);
            }
        )
    })
    router.get('/take/:isbn', (req, res) => {
        const { isbn } = req.params
        database.run(
            statements.take, [isbn],
            async (err, rows) => {
                console.log(err, rows)
                res.send(rows);
            }
        )
    })

    const statements = {
        search: 'select * from books where title like ? or author like ? or isbn = ?;',
        author: 'select * from books where author = ?;',
        category: 'select * from books where category = ?;',
        return: 'update books set state = "available" where id in (select id from books where isbn = ? and state = "due" limit 1);',
        take: 'update books set state = "due" where id in (select id from books where isbn = ? and state = "available" limit 1);',
    }

    return router
}
