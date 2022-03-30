const cheerio = require('cheerio')
const axios = require('axios')
const parseYear = require('../utils/parseYear')

const getBookData = async isbn => {
    //https://www.bookdepository.com/search?searchTerm=9780583310796&search=Find+book
    try {
        return await axios.get('https://www.bookdepository.com/search?searchTerm='+isbn+'&search=Find+book')
            .then(({data}) => {
                const $ = cheerio.load(data)
                const title = $('h1[itemprop=name]').text().trim()
                const author = $('span[itemprop=author]').text().trim()
                const year = parseYear($('span[itemprop=datePublished]').text())
                return {
                    title,
                    author,
                    year,
                    isbn
                }
            });
    } catch(e) {
        console.log(e)
    }
    return false
}

 module.exports = getBookData
