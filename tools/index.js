const axios = require('axios')
const fs = require('fs')
const sqlite3 = require('sqlite3');

const { ArgumentParser } = require('argparse');
const { version } = require('./package.json');
const KEY = ''
const getBookDataIsbnSearch = require('./searchModules/isbnSearch')
const getBookDepository = require('./searchModules/bookDepository')
const getBookDataGoogle = require('./searchModules/googleBooks')
const getBookDataOpenLibrary = require('./searchModules/openLibrary')
const fetcherFunctions = {
    google: getBookDataGoogle,
    depository: getBookDepository,
    openlibrary: getBookDataOpenLibrary,
    isbnsearch: getBookDataIsbnSearch,
}

const sleep = async ms => new Promise(accept => setTimeout(accept, ms))

const parser = new ArgumentParser({
  description: 'Argparse example'
});

parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-i', '--input', { help: 'input file' });
parser.add_argument('-c', '--category', { help: 'category' });
parser.add_argument('-f', '--fetcher', { help: 'valid values: google, depository, openlibrary, isbnsearch' });

const args = parser.parse_args();

// CONFIG FETCHER FUNCTION
const getBook = fetcherFunctions[args.fetcher]
if (!getBook) {
    console.log('Invalid fetcher function')
}
if (!args.input || !getBook) {
    parser.print_help();
    process.exit();
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
                //await sleep(300)
                const book_data = await getBook(rows[i].isbn)
                if (book_data) {
                    console.log(book_data)
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
