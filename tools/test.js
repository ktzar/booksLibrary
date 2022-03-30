const getBookData = require('./searchModules/bookDepository.js')

async function main() {
    const data = await getBookData('9780583310796')
    console.log(data)
}

main()
