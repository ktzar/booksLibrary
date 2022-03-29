const axios = require('axios')
const fs = require('fs')
const sqlite3 = require('sqlite3');

const { ArgumentParser } = require('argparse');
const { version } = require('./package.json');

const parser = new ArgumentParser({
  description: 'Argparse example'
});
parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-i', '--input', { help: 'input file' });

const args = parser.parse_args();
if (!args.input) {
    parser.print_help();
    process.exit();
}

async function getAuthorData(key) {
    return await axios(`https://openlibrary.org${key}`)
        .then(({data}) => data.name)
}

function parseYear(raw) {
    let year
    try {
        year = raw.match(/\d{4}/)[0]
    } catch(e) { year = 0; }
    return year;
}

async function getBookData(isbn) {
    return await axios(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then(async ({data}) => {
            const item = data?.items?.[0].volumeInfo
            if (!item) return false;
            console.log('getBookData', item)
            const book = {
                title: item.title,
                year: item.publishedDate?.match(/\d{4}/)[0] || 0,
                author: item.authors?.[0] || '',
                isbn: isbn
            }
            return book
        })
        .catch(e => {
            console.log(e)
            return false 
        })
}

async function getBookDataOpenLibrary(isbn) {
    return await axios(`https://openlibrary.org/isbn/${isbn}.json`)
        .then(async ({data}) => {
            const author = await getAuthorData(data.authors[0].key)
            const book = {
                title: data.title,
                year: data.publish_date.match(/\d{4}/)[0],
                author
            }
            return book
        })
        .catch(e => {
            console.log(e)
            return false
        })
}

async function main() {
    const db = new sqlite3.Database(args.input, err => {
        if (err) {
            console.log(err);
            process.exit();
        }
        const findEmptyStmnt = 'select * from books where title is null'
        const update = 'update books set title = $title, author = $author, year = $year where id = $id'

        db.all(findEmptyStmnt, [], async (err, rows) => {
            console.log(rows.length + " records to update")
            for (let i = 0; i< rows.length ; i++) {
                const book_data = await getBookData(rows[i].isbn)
                if (book_data) {
                    db.run(update, {
                        $title: book_data.title,
                        $author: book_data.author,
                        $year: book_data.year,
                        $id: rows[i].id
                    })
                    console.log(`Updated ${rows[i].isbn}`);
                } else {
                    console.log(`Not found ${rows[i].isbn}`);
                }
            }
        });
        console.log('done')
    });
}

main()
