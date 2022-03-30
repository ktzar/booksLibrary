const axios = require('axios')
const parseYear = require('../utils/parseYear')

async function getBookData(isbn) {
    return await axios(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)//&key=${KEY}`)
        .then(async ({data}) => {
            const item = data?.items?.[0].volumeInfo
            if (!item) return false;
            //console.log('getBookData', item)
            const book = {
                title: item.title,
                year: item.publishedDate?.match(/\d{4}/)[0] || 0,
                author: item.authors?.[0] || '',
                isbn: isbn
            }
            return book
        })
        .catch(e => {
            //console.log(e.response)
            console.log("Error")
            return false 
        })
}

module.exports = getBookData
