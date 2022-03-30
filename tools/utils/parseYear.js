function parseYear(raw) {
    let year
    try {
        year = raw.match(/\d{4}/)[0]
    } catch(e) { year = 0; }
    return year;
}

 module.exports = parseYear
