const axios = require('axios');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const { ArgumentParser } = require('argparse');
const { version } = require('./package.json');

const parser = new ArgumentParser({
  description: 'Argparse example'
});
parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-i', '--input', { help: 'input file' });
parser.add_argument('-c', '--category', { help: 'category' });

const args = parser.parse_args();
if (!args.input) {
    parser.print_help();
    process.exit();
}

async function main() {
    const db = new sqlite3.Database('./books.db', err => {
        if (err) {
            console.log(err);
            process.exit();
        }
        db.serialize(function () {
            const barcodesFile = new String(fs.readFileSync(args.input || './barcodes.txt'))
            const barcodes = barcodesFile.split("\n").filter(a => !!a)
            const output = []
            let i = 0
            const stmt = db.prepare('INSERT INTO books(isbn, category) VALUES(?, ?)')
            for (let barcode of barcodes) {
                console.log(`${i} - ${barcode}`)
                stmt.run(barcode, args.category);
                i++
            }
            stmt.finalize();
            console.log('done')
        });
        db.close();
    });
}

main()
