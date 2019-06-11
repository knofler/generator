const express = require('express')
const fs = require('fs');


const app = express();
const port = 9000

const pageSync = fs.readFileSync('page.html', 'utf8');

async function readFileData() {
    try {
        const data = await fs.readFile('page.js', (err, val) => {
            if (err) throw err;
            let file = val;
            return file;
        })
    } catch (err) {
        console.error(err)
    }
}
// const a = readFileData();
// console.log(a)

// console.log('pageSync',pageSync)

app.get('/', (req, res) => {
    res.send(pageSync)
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on ",port)
    }
})
