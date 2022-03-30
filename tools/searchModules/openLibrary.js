const cheerio = require('cheerio')
const parseYear = require('../utils/parseYear')

async function getAuthorData(key) {
    return await axios(`https://openlibrary.org${key}`)
        .then(({data}) => data.name)
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
            //console.log(e)
            return false
        })
}
