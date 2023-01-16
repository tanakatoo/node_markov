/** Command-line tool to generate Markov text. */

// open the file or url and generated text by printing it out
const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov')

//get filename
if (process.argv[2] == 'file') {
    pathToParse = process.argv[3]
    pathMakeText(pathToParse)
} else if (process.argv[2] == 'url') {
    urlToParse = process.argv[3]
    console.log('url to parse is', urlToParse)
    urlMakeText(urlToParse)
}


function pathMakeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err)
            process.kill(1)
        }
        let mm = new MarkovMachine(data)
        mm.makeText()
    })
}

async function urlMakeText(url) {
    try {
        const res = await axios.get(url)

        let mm = new MarkovMachine(res.data)
        mm.makeText()
    } catch (e) {
        console.log("ERROR:", e)
        process.kill(1)
    }
}
