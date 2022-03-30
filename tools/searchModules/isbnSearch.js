const cheerio = require('cheerio')
const axios = require('axios')
const parseYear = require('../utils/parseYear')

const getBookData = async isbn => {
    //https://isbnsearch.org/isbn/9781408346891
    try {
        return await axios.get('https://isbnsearch.org/isbn/' + isbn)
            .then(({data}) => {
                const $ = cheerio.load(data)
                const title = $('.bookinfo h1').text()
                const values = {}
                $('.bookinfo p').each((acc, item) => {
                    const vals = $(item).text().split(':')
                    values[vals[0].trim().toLowerCase()] = vals[1].trim()
                })
                return {
                    title,
                    author: values.author,
                    year: parseYear(values.published),
                    isbn
                }
            });
    } catch(e) {
        console.log(e)
    }
    return false
}

 module.exports = getBookData
